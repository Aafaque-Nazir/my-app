"use client";

import { useState } from "react";
import Modal from "./Modal";
import { useFleet } from "@/context/AppContext";

export default function AddDriverModal({ isOpen, onClose }) {
    const { addDriver } = useFleet();
    const [formData, setFormData] = useState({
        name: "",
        car: "",
        plate: "",
        phone: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simple validation could go here
        addDriver({ ...formData, avatar: "/avatars/default.png" });
        onClose();
        setFormData({ name: "", car: "", plate: "", phone: "" });
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Add New Driver">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-xs uppercase text-text-muted mb-1">Driver Name</label>
                    <input
                        required
                        type="text"
                        className="w-full bg-dark-950 border border-white/10 rounded-md px-3 py-2 text-white focus:border-royal-gold focus:outline-none"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Frank Martin"
                    />
                </div>
                <div>
                    <label className="block text-xs uppercase text-text-muted mb-1">Car Model</label>
                    <input
                        required
                        type="text"
                        className="w-full bg-dark-950 border border-white/10 rounded-md px-3 py-2 text-white focus:border-royal-gold focus:outline-none"
                        value={formData.car}
                        onChange={(e) => setFormData({ ...formData, car: e.target.value })}
                        placeholder="e.g. Audi A8"
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs uppercase text-text-muted mb-1">License Plate</label>
                        <input
                            required
                            type="text"
                            className="w-full bg-dark-950 border border-white/10 rounded-md px-3 py-2 text-white focus:border-royal-gold focus:outline-none"
                            value={formData.plate}
                            onChange={(e) => setFormData({ ...formData, plate: e.target.value })}
                            placeholder="ABC 123"
                        />
                    </div>
                    <div>
                        <label className="block text-xs uppercase text-text-muted mb-1">Phone</label>
                        <input
                            required
                            type="text"
                            className="w-full bg-dark-950 border border-white/10 rounded-md px-3 py-2 text-white focus:border-royal-gold focus:outline-none"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="555-0000"
                        />
                    </div>
                </div>

                <div className="pt-4 flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 text-sm text-text-muted hover:text-white transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-6 py-2 bg-royal-gold text-dark-950 font-bold rounded-md hover:bg-royal-gold-hover transition-colors"
                    >
                        Add Driver
                    </button>
                </div>
            </form>
        </Modal>
    );
}
