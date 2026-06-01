import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Circle, CalendarDays, Trophy, Sparkles, RotateCcw, Flame } from "lucide-react";
import "./styles.css";

const zones = {
  E: "Rustig 6:00–6:40/km",
  M: "Marathontempo 5:35–5:45/km",
  D: "Drempel 4:50–5:00/km",
  I: "Interval 4:20–4:40/km",
  relaxed: "Ontspannen 6:00–6:40/km"
};

const messages = [
  "Lekker bezig! Elke kilometer telt. 🏃‍♂️",
  "Afgevinkt! Je bouwt vandaag aan 4 uur. 🔥",
  "Sterk werk. De TT Marathon komt dichterbij. 🏁",
  "Mooi gedaan! Dit is hoe consistentie eruitziet. 💪",
  "Topper! Je toekomstige zelf bedankt je. ✨",
  "Training binnen. Tijd voor herstel en trots. 🥳",
  "Yes! Weer een stap dichter bij de finish. 🏆"
];

const plan = [
  [1,"2026-06-02","Dinsdag","3×8 min D, 2 min jog","Drempeltempo: 4:50–5:00/km"],
  [1,"2026-06-04","Donderdag","8 km rustig",zones.E],
  [1,"2026-06-07","Zondag","16 km rustig",zones.E],
  [2,"2026-06-09","Dinsdag","4×8 min D","Drempeltempo: 4:50–5:00/km"],
  [2,"2026-06-11","Donderdag","9 km rustig",zones.E],
  [2,"2026-06-14","Zondag","18 km rustig",zones.E],
  [3,"2026-06-16","Dinsdag","20 min D","Drempeltempo: 4:50–5:00/km"],
  [3,"2026-06-18","Donderdag","10 km rustig",zones.E],
  [3,"2026-06-21","Zondag","20 km rustig",zones.E],
  [4,"2026-06-23","Dinsdag","3×6 min D","Drempeltempo: 4:50–5:00/km"],
  [4,"2026-06-25","Donderdag","8 km rustig",zones.E],
  [4,"2026-06-28","Zondag","16 km rustig herstel",zones.E],
  [5,"2026-06-30","Dinsdag","2×15 min D","Drempeltempo: 4:50–5:00/km"],
  [5,"2026-07-02","Donderdag","10 km rustig",zones.E],
  [5,"2026-07-05","Zondag","22 km",zones.E],
  [6,"2026-07-07","Dinsdag","5×1 km","Interval: 4:45–4:50/km"],
  [6,"2026-07-09","Donderdag","10 km rustig",zones.E],
  [6,"2026-07-12","Zondag","24 km",zones.E],
  [7,"2026-07-14","Dinsdag","25 min D","Drempeltempo: 4:50–5:00/km"],
  [7,"2026-07-16","Donderdag","10 km rustig",zones.E],
  [7,"2026-07-19","Zondag","25 km",zones.E],
  [8,"2026-07-21","Dinsdag","3×8 min D","Drempeltempo: 4:50–5:00/km"],
  [8,"2026-07-23","Donderdag","8 km rustig",zones.E],
  [8,"2026-07-26","Zondag","18 km herstel",zones.E],
  [9,"2026-07-28","Dinsdag","3×10 min D","Drempeltempo: 4:50–5:00/km"],
  [9,"2026-07-30","Donderdag","12 km rustig",zones.E],
  [9,"2026-08-02","Zondag","26 km",zones.E],
  [10,"2026-08-04","Dinsdag","2×20 min D","Drempeltempo: 4:50–5:00/km"],
  [10,"2026-08-06","Donderdag","10 km rustig",zones.E],
  [10,"2026-08-09","Zondag","28 km",zones.E],
  [11,"2026-08-11","Dinsdag","6×1 km","Interval: 4:45/km"],
  [11,"2026-08-13","Donderdag","12 km rustig",zones.E],
  [11,"2026-08-16","Zondag","28 km, laatste 8 km M","Rustig + M: 5:35–5:45/km"],
  [12,"2026-08-18","Dinsdag","20 min D","Drempeltempo: 4:50–5:00/km"],
  [12,"2026-08-20","Donderdag","8 km rustig",zones.E],
  [12,"2026-08-23","Zondag","22 km herstel",zones.E],
  [13,"2026-08-25","Dinsdag","3×12 min D","Drempeltempo: 4:50–5:00/km"],
  [13,"2026-08-27","Donderdag","12 km rustig",zones.E],
  [13,"2026-08-30","Zondag","30 km",zones.E],
  [14,"2026-09-01","Dinsdag","2×20 min D","Drempeltempo: 4:50–5:00/km"],
  [14,"2026-09-03","Donderdag","12 km rustig",zones.E],
  [14,"2026-09-06","Zondag","30 km, laatste 10 km M","Rustig + M: 5:35–5:45/km"],
  [15,"2026-09-08","Dinsdag","5×1 km","Interval: 4:40–4:45/km"],
  [15,"2026-09-10","Donderdag","10 km rustig",zones.E],
  [15,"2026-09-13","Zondag","32 km",zones.E],
  [16,"2026-09-15","Dinsdag","20 min D","Drempeltempo: 4:50–5:00/km"],
  [16,"2026-09-17","Donderdag","8 km rustig",zones.E],
  [16,"2026-09-20","Zondag","24 km herstel",zones.E],
  [17,"2026-09-22","Dinsdag","3×15 min D","Drempeltempo: 4:50–5:00/km"],
  [17,"2026-09-24","Donderdag","12 km rustig",zones.E],
  [17,"2026-09-27","Zondag","32 km, 12 km M","Rustig + M: 5:35–5:45/km"],
  [18,"2026-09-29","Dinsdag","2×20 min D","Drempeltempo: 4:50–5:00/km"],
  [18,"2026-10-01","Donderdag","10 km rustig",zones.E],
  [18,"2026-10-04","Zondag","34 km langste duurloop",zones.E],
  [19,"2026-10-06","Dinsdag","25 min D","Drempeltempo: 4:50–5:00/km"],
  [19,"2026-10-08","Donderdag","10 km rustig",zones.E],
  [19,"2026-10-11","Zondag","28 km, 10 km M","Rustig + M: 5:35–5:45/km"],
  [20,"2026-10-13","Dinsdag","3×8 min D","Drempeltempo: 4:50–5:00/km"],
  [20,"2026-10-15","Donderdag","8 km rustig",zones.E],
  [20,"2026-10-18","Zondag","20 km",zones.E],
  [21,"2026-10-20","Dinsdag","15 min D","Drempeltempo: 4:50–5:00/km"],
  [21,"2026-10-22","Donderdag","8 km rustig",zones.E],
  [21,"2026-10-25","Zondag","12 km rustig",zones.E],
  [22,"2026-10-27","Dinsdag","6 km ontspannen + versnellingen","Ontspannen + korte versnellingen"],
  [22,"2026-10-29","Donderdag","5 km ontspannen",zones.relaxed],
  [22,"2026-11-01","Zondag","TT Marathon","Doeltempo: 5:41/km voor 4:00 uur"]
].map(([week,date,day,activity,pace], i) => ({ id: `${date}-${i}`, week, date, day, activity, pace }));

function formatDate(s) {
  return new Intl.DateTimeFormat("nl-NL", { weekday: "long", day: "numeric", month: "long" }).format(new Date(`${s}T12:00:00`));
}
function todayIso() { return new Date().toISOString().slice(0,10); }
function nextTraining(completed) {
  const today = todayIso();
  return plan.find(t => t.date >= today && !completed[t.id]) || plan.find(t => !completed[t.id]) || plan[plan.length - 1];
}
function countdown() {
  const target = new Date("2026-11-01T09:00:00");
  const now = new Date();
  return Math.max(0, Math.ceil((target - now) / (1000*60*60*24)));
}

function App() {
  const [completed, setCompleted] = useState({});
  const [celebration, setCelebration] = useState(null);
  const [weekFilter, setWeekFilter] = useState("all");

  useEffect(() => {
    const saved = localStorage.getItem("tt-marathon-completed");
    if (saved) setCompleted(JSON.parse(saved));
  }, []);
  useEffect(() => {
    localStorage.setItem("tt-marathon-completed", JSON.stringify(completed));
  }, [completed]);

  const doneCount = Object.values(completed).filter(Boolean).length;
  const progress = Math.round((doneCount / plan.length) * 100);
  const upcoming = nextTraining(completed);
  const weeks = [...new Set(plan.map(t => t.week))];
  const visiblePlan = weekFilter === "all" ? plan : plan.filter(t => t.week === Number(weekFilter));
  const grouped = useMemo(() => visiblePlan.reduce((acc, t) => {
    acc[t.week] = acc[t.week] || [];
    acc[t.week].push(t);
    return acc;
  }, {}), [visiblePlan]);

  function toggle(item) {
    const nowDone = !completed[item.id];
    setCompleted(prev => ({ ...prev, [item.id]: nowDone }));
    if (nowDone) {
      setCelebration(messages[Math.floor(Math.random() * messages.length)]);
      setTimeout(() => setCelebration(null), 2800);
    }
  }
  function reset() {
    setCompleted({});
    setCelebration("Nieuwe start! Je schema staat weer klaar. 🌱");
    setTimeout(() => setCelebration(null), 2400);
  }

  return (
    <div className="app">
      <main className="container">
        <motion.header initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} className="header">
          <div className="eyebrow"><Trophy size={16}/> TT Marathon · doel 4:00 uur</div>
          <h1>Jouw marathonschema</h1>
          <p>3 trainingen per week richting 1 november. Nog <strong>{countdown()}</strong> dagen tot raceday.</p>
        </motion.header>

        <section className="card progress-card">
          <div className="row"><strong>Voortgang</strong><span>{doneCount}/{plan.length} trainingen</span></div>
          <div className="bar"><motion.div initial={{width:0}} animate={{width:`${progress}%`}} /></div>
          <div className="progress-number">{progress}%</div>
        </section>

        <section className="card next-card">
          <div className="eyebrow"><CalendarDays size={16}/> Eerstvolgende training</div>
          <h2>{formatDate(upcoming.date)}</h2>
          <h3>{upcoming.activity}</h3>
          <p className="pace">{upcoming.pace}</p>
          <button className="primary" onClick={() => toggle(upcoming)}>{completed[upcoming.id] ? "Terugzetten" : "Training afvinken"}</button>
        </section>

        <div className="filters">
          <button onClick={() => setWeekFilter("all")} className={weekFilter === "all" ? "active" : ""}>Alles</button>
          {weeks.map(w => <button key={w} onClick={() => setWeekFilter(String(w))} className={weekFilter === String(w) ? "active" : ""}>Week {w}</button>)}
        </div>

        <section className="list">
          {Object.entries(grouped).map(([week, items]) => (
            <div key={week} className="week-block">
              <h4>Week {week}</h4>
              {items.map(item => {
                const done = completed[item.id];
                const current = item.date === todayIso();
                return (
                  <motion.button layout key={item.id} onClick={() => toggle(item)} className={`training ${done ? "done" : ""} ${current ? "today" : ""}`}>
                    <span className="icon">{done ? <CheckCircle2/> : <Circle/>}</span>
                    <span className="training-content">
                      <span className="date-line">{formatDate(item.date)} {current && <b>Vandaag</b>}</span>
                      <span className="activity">{item.activity}</span>
                      <span className="pace">{item.pace}</span>
                    </span>
                  </motion.button>
                );
              })}
            </div>
          ))}
        </section>

        <button className="reset" onClick={reset}><RotateCcw size={16}/> Voortgang resetten</button>
        <p className="footer"><Flame size={14}/> Consistentie wint de marathon.</p>
      </main>

      <AnimatePresence>
        {celebration && (
          <motion.div initial={{ opacity: 0, y: 50, scale: .95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 50, scale: .95 }} className="toast">
            <Sparkles size={28}/><div><strong>Training voltooid!</strong><p>{celebration}</p></div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
