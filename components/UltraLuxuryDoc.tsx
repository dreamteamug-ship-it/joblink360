<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JobLink 360 - Sovereign Career Roadmap</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;700;900&display=swap');
        :root { --gold: #D4AF37; --matte-black: #1A1A1A; }
        body { font-family: 'Inter', sans-serif; background: #000; color: #fff; margin: 0; }
        .a4-page { width: 210mm; min-height: 297mm; padding: 20mm; margin: 10mm auto; background: var(--matte-black); border: 1px solid #333; position: relative; }
        .gold-emboss { color: var(--gold); text-transform: uppercase; letter-spacing: 4px; font-weight: 900; }
        .industrial-border { border-left: 4px solid var(--gold); padding-left: 20px; }
        @media print { .no-print { display: none; } .a4-page { margin: 0; border: none; } }
    </style>
</head>
<body>
    <div class="no-print bg-zinc-900 p-4 sticky top-0 z-50 flex gap-4 justify-center border-b border-zinc-800">
        <button onclick="exportPDF()" class="bg-amber-600 px-6 py-2 rounded font-bold text-sm">DOWNLOAD PDF</button>
    </div>
    <div id="document-root">
        <div class="a4-page" id="page-1">
            <h1 class="gold-emboss text-5xl">Sovereign</h1>
            <p class="text-zinc-500 font-bold tracking-widest uppercase">Career Roadmap v1.0</p>
            <div class="industrial-border mt-12 mb-8">
                <h2 class="text-2xl font-bold mb-2">01. STRATEGIC ANALYSIS</h2>
                <div class="text-zinc-300 text-sm">Targeting high-yield gaps in Nairobi and Lusaka tech corridors.</div>
            </div>
            <div class="absolute bottom-10 left-20 right-20 flex justify-between text-[10px] text-zinc-600 border-t border-zinc-800 pt-4">
                <span>CONFIDENTIAL & PROPRIETARY</span>
                <span>PAGE 01</span>
            </div>
        </div>
    </div>
    <script>
        function exportPDF() {
            const element = document.getElementById('document-root');
            html2pdf().set({ margin: 0, filename: 'Sovereign_Roadmap.pdf', jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' } }).from(element).save();
        }
    </script>
</body>
</html>
