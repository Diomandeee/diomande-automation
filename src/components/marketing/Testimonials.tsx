"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/shared/Card";

const stats = [
  { value: "10,000+", label: "Tasks executed in production" },
  { value: "99.7%", label: "Task completion rate" },
  { value: "5", label: "AI models routed intelligently" },
  { value: "24/7", label: "Autonomous operation" },
];

export function Testimonials() {
  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Battle-Tested in Production
          </h2>
          <p className="text-lg text-[#a0a0b8] max-w-2xl mx-auto">
            Built and refined through real-world autonomous operation —
            not a hackathon demo.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <Card className="text-center py-8">
                <div className="text-3xl font-bold text-gradient-cyan mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-[#6b6b80]">{stat.label}</div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
