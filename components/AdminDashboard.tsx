<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sovereign Admin - Command Center</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;700;900&display=swap');
        :root { --gold: #D4AF37; --matte-black: #0F0F0F; --industrial-gray: #1A1A1A; }
        body { font-family: 'Inter', sans-serif; background: var(--matte-black); color: #fff; margin: 0; }
        .glass-panel { background: rgba(26, 26, 26, 0.8); border: 1px solid #333; backdrop-filter: blur(10px); }
        .gold-border { border-left: 3px solid var(--gold); }
        .status-dot { height: 8px; width: 8px; border-radius: 50%; display: inline-block; }
        .active-glow { box-shadow: 0 0 15px var(--gold); }
    </style>
</head>
<body class="p-8">
    <header class="flex justify-between items-center mb-12 border-b border-zinc-800 pb-8">
        <div>
            <h1 class="text-4xl font-black uppercase tracking-tighter text-amber-500">Command Center</h1>
            <p class="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.5em]">Sovereign Project / Student Lifecycle</p>
        </div>
        <div class="text-right">
            <div class="text-xs font-bold text-zinc-400">SESSION: 2026-ALPHA</div>
            <div class="text-[10px] text-amber-600 font-mono">STATUS: ENCRYPTED & SYNCED</div>
        </div>
    </header>

    <main class="grid grid-cols-4 gap-6">
        <div class="glass-panel p-6 gold-border">
            <h3 class="text-[10px] text-zinc-500 uppercase font-black mb-2">Total Students</h3>
            <div class="text-3xl font-light">1,204</div>
        </div>
        <div class="glass-panel p-6 gold-border">
            <h3 class="text-[10px] text-zinc-500 uppercase font-black mb-2">Market Ready</h3>
            <div class="text-3xl font-light text-amber-500">512</div>
        </div>
        <div class="glass-panel p-6 gold-border">
            <h3 class="text-[10px] text-zinc-500 uppercase font-black mb-2">Sync Rate</h3>
            <div class="text-3xl font-light">99.8%</div>
        </div>
        <div class="glass-panel p-6 gold-border">
            <h3 class="text-[10px] text-zinc-500 uppercase font-black mb-2">Deployment Zone</h3>
            <div class="text-3xl font-light uppercase text-xs">Nairobi / Lusaka</div>
        </div>

        <div class="col-span-4 glass-panel p-8 mt-6">
            <h2 class="text-xs font-black uppercase tracking-widest text-zinc-400 mb-6">Live Lifecycle Tracking</h2>
            <table class="w-full text-left text-xs">
                <thead class="text-zinc-600 uppercase border-b border-zinc-800">
                    <tr>
                        <th class="pb-4">Student ID</th>
                        <th class="pb-4">Roadmap</th>
                        <th class="pb-4">Cover Letter</th>
                        <th class="pb-4">CV</th>
                        <th class="pb-4">Cloud Sync</th>
                    </tr>
                </thead>
                <tbody class="text-zinc-300">
                    <tr class="border-b border-zinc-900">
                        <td class="py-4 font-mono">AMANDA-001</td>
                        <td class="py-4 text-green-500 font-bold">LOCKED</td>
                        <td class="py-4 text-green-500 font-bold">LOCKED</td>
                        <td class="py-4 text-green-500 font-bold">LOCKED</td>
                        <td class="py-4"><span class="status-dot bg-amber-500 active-glow mr-2"></span>VERIFIED</td>
                    </tr>
                    <tr class="border-b border-zinc-900 opacity-50">
                        <td class="py-4 font-mono">SOV-STU-088</td>
                        <td class="py-4 text-green-500">LOCKED</td>
                        <td class="py-4 text-zinc-700 italic">PENDING</td>
                        <td class="py-4 text-green-500">LOCKED</td>
                        <td class="py-4"><span class="status-dot bg-zinc-700 mr-2"></span>WAITING</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </main>

    <footer class="mt-12 text-[10px] text-zinc-800 uppercase tracking-widest flex justify-between">
        <span>Admin Vault / Auth Required: Ctrl+E</span>
        <span>DreamTeQ Sovereign Architecture 2026</span>
    </footer>
</body>
</html>
