<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sovereign Executive Letter - Portrait</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;700;900&display=swap');
        :root { --gold: #D4AF37; --matte-black: #1A1A1A; }
        body { font-family: 'Inter', sans-serif; background: #000; color: #fff; }
        .a4-page { width: 210mm; height: 297mm; padding: 25mm; margin: 10mm auto; background: var(--matte-black); border: 1px solid #333; position: relative; box-shadow: 0 0 50px rgba(0,0,0,0.5); }
        .gold-line { height: 2px; background: linear-gradient(90deg, var(--gold) 0%, transparent 100%); width: 100px; margin-bottom: 20px; }
        [contenteditable="true"]:focus { outline: 1px dashed var(--gold); background: rgba(212,175,55,0.05); }
        .letter-content { font-size: 13px; line-height: 1.8; color: #d1d1d1; }
        @media print { .no-print { display: none; } .a4-page { margin: 0; border: none; box-shadow: none; } }
    </style>
</head>
<body class="p-4">
    <nav class="no-print mb-8 flex justify-center gap-4">
        <button onclick="exportToPDF()" class="bg-amber-600 px-6 py-2 rounded text-xs font-bold uppercase">Export PDF</button>
        <button onclick="saveDocument()" class="bg-zinc-800 px-6 py-2 rounded text-xs font-bold uppercase border border-zinc-700">Save HTML</button>
    </nav>

    <div id="letter-root" class="a4-page">
        <header class="mb-16">
            <h1 class="text-3xl font-black text-amber-500 uppercase tracking-tighter">Sovereign</h1>
            <p class="text-[10px] font-bold text-zinc-500 tracking-[0.3em] uppercase">Executive Communications</p>
            <div class="gold-line mt-4"></div>
        </header>

        <div class="flex justify-between mb-12 text-[10px] text-zinc-500 uppercase font-bold">
            <div contenteditable="true">
                DATE: MARCH 20, 2026<br>
                REF: SOV-EXEC-254
            </div>
            <div class="text-right" contenteditable="true">
                TARGET: CHIEF ARCHITECT<br>
                LOC: NAIROBI TECH CORRIDOR
            </div>
        </div>

        <main class="letter-content" contenteditable="true">
            <p class="mb-6">To the Selection Committee,</p>
            
            <p class="mb-6">
                I am writing to formally submit my candidacy for the role of Cloud Systems Architect. In a market currently saturated with generalists, my approach is defined by Sovereign Engineering. I specialize in building high-resiliency, low-latency infrastructure that thrives within the specific technical constraints of the Rift Valley corridor.
            </p>

            <p class="mb-6">
                My recent work within the DreamTeQ ecosystem involved the hardening of A4-compliant document systems and the deployment of 512-point data injection agents. I do not just manage cloud systems. I architect sovereign solutions that ensure data integrity and operational continuity in volatile environments.
            </p>

            <p class="mb-6">
                I am not interested in maintenance. I am interested in the aggressive expansion of your technical capabilities.
            </p>

            <p class="mt-12">
                Regards,<br><br>
                <span class="text-amber-500 font-bold uppercase tracking-widest text-lg">[SIGNATURE]</span><br>
                <span class="text-zinc-500 font-bold uppercase text-[10px]">Sovereign Systems Engineer</span>
            </p>
        </main>

        <footer class="absolute bottom-10 left-25 right-25 border-t border-zinc-800 pt-4 flex justify-between text-[8px] text-zinc-700 uppercase tracking-widest">
            <span>Confidential - Sovereign Project</span>
            <span>Document ID: SOV-2026-LTR</span>
        </footer>
    </div>

    <script>
        function exportToPDF() {
            const element = document.getElementById('letter-root');
            html2pdf().set({
                margin: 0,
                filename: 'Sovereign_Executive_Letter.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2, backgroundColor: '#1A1A1A' },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
            }).from(element).save();
        }

        function saveDocument() {
            const html = document.documentElement.outerHTML;
            const blob = new Blob([html], {type: "text/html"});
            const a = document.createElement("a");
            a.href = URL.createObjectURL(blob);
            a.download = "Sovereign_Letter_Live.html";
            a.click();
        }
    </script>
</body>
</html>
