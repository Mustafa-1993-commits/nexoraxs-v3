import { motion } from "framer-motion";
import { ShoppingBag, Stethoscope, Utensils, Wrench } from "lucide-react";

const apps = [
  { id: "shop", label: "Shops", icon: ShoppingBag, color: "text-pink-400", bg: "bg-pink-500/10", border: "border-pink-500/20", pos: "top-0 left-0", delay: 0 },
  { id: "clinic", label: "Clinics", icon: Stethoscope, color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20", pos: "top-0 right-0", delay: 0.2 },
  { id: "resto", label: "Restaurants", icon: Utensils, color: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500/20", pos: "bottom-0 left-0", delay: 0.4 },
  { id: "maint", label: "Maintenance", icon: Wrench, color: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/20", pos: "bottom-0 right-0", delay: 0.6 },
];

export function CoreIllustration() {
  return (
    <div className="relative w-full max-w-lg aspect-square mx-auto">
      {/* Central Core */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 z-20"
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="relative w-full h-full">
          <div className="absolute inset-0 bg-[#161A2E] rounded-3xl border border-purple-500/30 shadow-[0_0_50px_-10px_rgba(109,76,255,0.3)] flex flex-col items-center justify-center backdrop-blur-xl z-20">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-600 to-cyan-500 flex items-center justify-center mb-2 shadow-lg">
              <span className="text-white font-bold text-3xl">N</span>
            </div>
            <div className="text-white font-bold text-xl tracking-wider">CORE</div>
            <div className="text-purple-300/60 text-xs uppercase tracking-widest mt-1">System</div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-cyan-500 rounded-3xl blur-2xl opacity-20 z-10" />
        </div>
      </motion.div>

      {/* Orbiting App Cards */}
      {apps.map((app) => (
        <motion.div
          key={app.id}
          className={`absolute ${app.pos} z-10`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 + app.delay, duration: 0.5 }}
        >
          <motion.div
            className={`w-28 h-28 ${app.bg} backdrop-blur-md rounded-2xl border ${app.border} flex flex-col items-center justify-center shadow-lg`}
            whileHover={{ scale: 1.05, y: -5 }}
            animate={{ y: [0, -5, 0] }}
            transition={{ y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: app.delay }, scale: { duration: 0.2 } }}
          >
            <app.icon className={`w-8 h-8 ${app.color} mb-2`} />
            <span className="text-white text-sm font-medium">{app.label}</span>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
