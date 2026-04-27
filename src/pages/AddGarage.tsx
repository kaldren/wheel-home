import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAppStore } from "@/store/useAppStore";
import type { AccessType, GarageSize } from "@/data/mockData";
import { toast } from "sonner";
import garagePlaceholder from "@/assets/garage-1.jpg";

const AddGarage = () => {
  const navigate = useNavigate();
  const addGarage = useAppStore((s) => s.addGarage);

  const [form, setForm] = useState({
    title: "",
    description: "",
    address: "",
    city: "Lisbon",
    area: "",
    pricePerDay: 20,
    size: "medium" as GarageSize,
    accessType: "remote" as AccessType,
    accessInstructions: "",
  });

  const update = <K extends keyof typeof form>(key: K, value: typeof form[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.address || !form.area) {
      toast.error("Please fill in title, address and area.");
      return;
    }
    const id = addGarage({
      ...form,
      photos: [garagePlaceholder],
      unavailableDates: [],
      // mock coords near Lisbon center, with a small jitter
      coordinates: {
        lat: 38.72 + (Math.random() - 0.5) * 0.05,
        lng: -9.14 + (Math.random() - 0.5) * 0.05,
      },
    });
    toast.success("Garage listed!", { description: "It's now visible to potential guests." });
    navigate(`/garages/${id}`);
  };

  return (
    <div className="container py-6 md:py-10 max-w-2xl">
      <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">List a new garage</h1>
      <p className="text-muted-foreground mb-8">A few details and you're ready to host.</p>

      <form onSubmit={onSubmit} className="space-y-6">
        <Field label="Title">
          <Input
            placeholder="e.g. Bright single garage near downtown"
            value={form.title}
            onChange={(e) => update("title", e.target.value)}
          />
        </Field>

        <Field label="Description">
          <Textarea
            rows={4}
            placeholder="Tell guests what makes your spot great…"
            value={form.description}
            onChange={(e) => update("description", e.target.value)}
          />
        </Field>

        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Address">
            <Input value={form.address} onChange={(e) => update("address", e.target.value)} placeholder="Street and number" />
          </Field>
          <Field label="Area / neighborhood">
            <Input value={form.area} onChange={(e) => update("area", e.target.value)} placeholder="e.g. Baixa" />
          </Field>
          <Field label="City">
            <Input value={form.city} onChange={(e) => update("city", e.target.value)} />
          </Field>
          <Field label="Price per day (€)">
            <Input
              type="number"
              min={1}
              value={form.pricePerDay}
              onChange={(e) => update("pricePerDay", Number(e.target.value))}
            />
          </Field>
          <Field label="Size">
            <Select value={form.size} onValueChange={(v) => update("size", v as GarageSize)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="small">Small — compact car</SelectItem>
                <SelectItem value="medium">Medium — standard car</SelectItem>
                <SelectItem value="large">Large — SUV / van</SelectItem>
                <SelectItem value="xl">Extra large — 2 cars</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field label="Access type">
            <Select value={form.accessType} onValueChange={(v) => update("accessType", v as AccessType)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="remote">Remote opener</SelectItem>
                <SelectItem value="key">Physical key</SelectItem>
                <SelectItem value="code">Keypad code</SelectItem>
                <SelectItem value="smart-lock">Smart lock</SelectItem>
                <SelectItem value="attendant">On-site attendant</SelectItem>
              </SelectContent>
            </Select>
          </Field>
        </div>

        <Field label="Access instructions">
          <Textarea
            rows={3}
            placeholder="How will guests get in?"
            value={form.accessInstructions}
            onChange={(e) => update("accessInstructions", e.target.value)}
          />
        </Field>

        <div className="rounded-2xl border border-dashed border-border p-6 text-center bg-muted/30">
          <p className="text-sm font-medium">Photos</p>
          <p className="text-xs text-muted-foreground mt-1">Photo upload coming with Cloud storage. We'll use a default placeholder for now.</p>
        </div>

        <div className="flex gap-3 pt-2">
          <Button type="button" variant="outline" onClick={() => navigate("/host")}>Cancel</Button>
          <Button type="submit" className="flex-1">Publish listing</Button>
        </div>
      </form>
    </div>
  );
};

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="space-y-2">
    <Label>{label}</Label>
    {children}
  </div>
);

export default AddGarage;
