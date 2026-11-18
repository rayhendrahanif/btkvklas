/* BTKVKlas — data klasifikasi.
   Format: E(id, kategori, nama, subjudul, baris, catatan, opsi)
   - baris  : [[label, deskripsi], ...]
   - opsi   : { h: [judulKolom1, judulKolom2], k: "kata kunci tambahan untuk pencarian" }
   Tambah/ubah entri cukup di berkas ini. */

const CATS = [
  { id: "umum", name: "Umum & perioperatif" },
  { id: "hf", name: "Gagal jantung & syok" },
  { id: "koroner", name: "Koroner" },
  { id: "katup", name: "Katup" },
  { id: "aorta", name: "Aorta" },
  { id: "kongenital", name: "Kongenital" },
  { id: "toraks", name: "Toraks" },
  { id: "vaskular", name: "Vaskular" }
];

const DATA = [];
function E(id, c, n, s, r, note, o) {
  o = o || {};
  DATA.push({ id: id, c: c, n: n, s: s, r: r, note: note || "", h: o.h || ["Tipe", "Deskripsi"], k: o.k || "" });
}

/* ───────────── UMUM & PERIOPERATIF ───────────── */

E("sts-risk", "umum", "Risiko operasi STS-PROM", "Society of Thoracic Surgeons Predicted Risk of Mortality", [
  ["Rendah", "STS-PROM <4%"],
  ["Sedang", "STS-PROM 4–8%"],
  ["Tinggi", "STS-PROM >8%"],
  ["Prohibitif", "Perkiraan risiko kematian atau morbiditas mayor >50% dalam 1 tahun, atau kondisi yang tidak tertangkap skor (frailty berat, porcelain aorta, dada pasca-radiasi)"]
], "Tabel penilaian risiko pedoman katup ACC/AHA (American College of Cardiology/American Heart Association) 2014/2017. STS-PROM hanya satu komponen: risiko rendah harus memenuhi semuanya (STS <4%, tanpa frailty, tanpa gangguan organ mayor, tanpa hambatan prosedur); satu kriteria saja cukup untuk naik ke kategori lebih tinggi. EuroSCORE II (European System for Cardiac Operative Risk Evaluation II) tidak punya ambang resmi; dipakai sebagai angka kontinu.", { h: ["Kategori", "Kriteria"], k: "euroscore tavr savr heart team" });

E("asa", "umum", "ASA", "American Society of Anesthesiologists Physical Status", [
  ["I", "Pasien sehat"],
  ["II", "Penyakit sistemik ringan"],
  ["III", "Penyakit sistemik berat"],
  ["IV", "Penyakit sistemik berat yang terus-menerus mengancam nyawa"],
  ["V", "Moribund, tidak diharapkan hidup tanpa operasi"],
  ["VI", "Mati batang otak, donor organ"]
], "Tambahkan akhiran E untuk operasi emergensi.", { h: ["Kelas", "Deskripsi"] });

E("af-tipe", "umum", "Fibrilasi atrium — pola klinis", "Klasifikasi AF (Atrial Fibrillation) menurut durasi", [
  ["Paroksismal", "Berhenti spontan atau dengan intervensi dalam ≤7 hari"],
  ["Persisten", "Menetap >7 hari, termasuk yang dikonversi setelah ≥7 hari"],
  ["Persisten lama", "Long-standing persistent: kontinu >12 bulan saat strategi kontrol irama dipilih"],
  ["Permanen", "Pasien dan dokter sepakat tidak lagi mengupayakan irama sinus"]
], "Relevan untuk pemilihan set lesi ablasi bedah (Cox-Maze) saat operasi katup/koroner.", { h: ["Pola", "Definisi"], k: "maze ablasi" });

E("chads-vasc", "umum", "CHA₂DS₂-VASc", "Skor risiko stroke pada fibrilasi atrium", [
  ["C", "Congestive heart failure (gagal jantung) — 1"],
  ["H", "Hipertensi — 1"],
  ["A₂", "Age (usia) ≥75 tahun — 2"],
  ["D", "Diabetes melitus — 1"],
  ["S₂", "Stroke / TIA (Transient Ischemic Attack) / tromboemboli — 2"],
  ["V", "Vascular disease: infark miokard, penyakit arteri perifer, plak aorta — 1"],
  ["A", "Age 65–74 tahun — 1"],
  ["Sc", "Sex category perempuan — 1"]
], "Total 0–9. Ambang antikoagulasi berbeda antar pedoman; umumnya dipertimbangkan pada ≥1 (laki-laki) / ≥2 (perempuan) dan direkomendasikan pada ≥2 / ≥3.", { h: ["Huruf", "Komponen — poin"], k: "chadsvasc antikoagulan" });

E("has-bled", "umum", "HAS-BLED", "Skor risiko perdarahan pada antikoagulasi", [
  ["H", "Hipertensi tidak terkontrol (sistolik >160 mmHg) — 1"],
  ["A", "Abnormal fungsi ginjal / hati — masing-masing 1"],
  ["S", "Stroke — 1"],
  ["B", "Bleeding: riwayat atau predisposisi perdarahan — 1"],
  ["L", "Labile INR (International Normalized Ratio) — 1"],
  ["E", "Elderly: usia >65 tahun — 1"],
  ["D", "Drugs (antiplatelet/OAINS) / alkohol — masing-masing 1"]
], "Total 0–9; ≥3 = risiko tinggi → koreksi faktor yang bisa diubah dan pantau lebih ketat, bukan alasan tunggal menghentikan antikoagulan.", { h: ["Huruf", "Komponen — poin"] });

E("barc", "umum", "BARC", "Bleeding Academic Research Consortium", [
  ["0", "Tidak ada perdarahan"],
  ["1", "Perdarahan yang tidak memerlukan tindakan"],
  ["2", "Perdarahan nyata yang memerlukan evaluasi/tindakan non-bedah, tidak memenuhi tipe 3–5"],
  ["3a", "Penurunan Hb 3–<5 g/dL, atau transfusi apa pun"],
  ["3b", "Penurunan Hb ≥5 g/dL, tamponade, perlu kontrol bedah, atau perlu vasoaktif intravena"],
  ["3c", "Perdarahan intrakranial atau intraokular yang mengganggu penglihatan"],
  ["4", "Terkait CABG (Coronary Artery Bypass Grafting): intrakranial ≤48 jam, re-operasi pasca-penutupan sternum untuk kontrol perdarahan, transfusi ≥5 unit dalam 48 jam, atau drain toraks ≥2 L/24 jam"],
  ["5", "Fatal: 5a probable, 5b definite"]
], "", { k: "perdarahan bleeding" });

E("udpb", "umum", "UDPB", "Universal Definition of Perioperative Bleeding (bedah jantung dewasa)", [
  ["0", "Insignifikan: drain 12 jam ≤600 mL, tanpa transfusi PRC (Packed Red Cells) maupun FFP (Fresh Frozen Plasma)"],
  ["1", "Ringan: drain 601–800 mL, PRC 1 unit, tanpa FFP"],
  ["2", "Sedang: drain 801–1000 mL, PRC 2–4 unit, FFP 2–4 unit; trombosit, kriopresipitat, atau konsentrat kompleks protrombin boleh dipakai"],
  ["3", "Berat: drain 1001–2000 mL, PRC 5–10 unit, FFP 5–10 unit, penutupan sternum tertunda, re-eksplorasi/tamponade"],
  ["4", "Masif: drain >2000 mL, PRC >10 unit, FFP >10 unit, pemakaian rFVIIa (faktor VIIa rekombinan)"]
], "Kelas ditentukan oleh komponen terburuk. Komponen lain (penutupan sternum tertunda, trombosit, kriopresipitat, konsentrat faktor) lihat publikasi asli Dyke dkk. 2014.", { h: ["Kelas", "Kriteria utama"], k: "perdarahan pascaoperasi drain re-open" });

E("kdigo-aki", "umum", "KDIGO AKI", "Kidney Disease: Improving Global Outcomes — Acute Kidney Injury", [
  ["1", "Kreatinin 1,5–1,9× basal atau naik ≥0,3 mg/dL dalam 48 jam; urin <0,5 mL/kg/jam selama 6–12 jam"],
  ["2", "Kreatinin 2,0–2,9× basal; urin <0,5 mL/kg/jam selama ≥12 jam"],
  ["3", "Kreatinin ≥3× basal atau ≥4,0 mg/dL atau mulai terapi pengganti ginjal; urin <0,3 mL/kg/jam ≥24 jam atau anuria ≥12 jam"]
], "Dasar definisi AKI terkait bedah jantung (CSA-AKI, Cardiac Surgery-Associated AKI).", { h: ["Stadium", "Kreatinin serum; produksi urin"], k: "gagal ginjal akut" });

E("clavien", "umum", "Clavien-Dindo", "Klasifikasi komplikasi pascabedah", [
  ["I", "Penyimpangan dari perjalanan normal tanpa terapi khusus (boleh: antiemetik, antipiretik, analgesik, diuretik, elektrolit, fisioterapi)"],
  ["II", "Perlu terapi farmakologis lain, transfusi, atau nutrisi parenteral total"],
  ["IIIa", "Perlu intervensi bedah/endoskopi/radiologi tanpa anestesi umum"],
  ["IIIb", "Perlu intervensi dengan anestesi umum"],
  ["IVa", "Mengancam nyawa, disfungsi satu organ (perlu ICU)"],
  ["IVb", "Mengancam nyawa, disfungsi multiorgan"],
  ["V", "Kematian"]
], "", { h: ["Derajat", "Deskripsi"] });

E("cdc-ssi", "umum", "Infeksi daerah operasi (CDC)", "Centers for Disease Control and Prevention — Surgical Site Infection", [
  ["Superfisial", "Kulit dan subkutis, dalam 30 hari"],
  ["Dalam", "Fasia dan otot; pada sternotomi termasuk infeksi sternum"],
  ["Organ/rongga", "Mediastinitis, perikarditis, empiema; periode surveilans lebih panjang bila ada implan"]
], "", { h: ["Tingkat", "Jaringan terlibat"], k: "ssi ido luka operasi" });

E("el-oakley", "umum", "El Oakley & Wright", "Klasifikasi mediastinitis pasca-sternotomi", [
  ["I", "Muncul dalam 2 minggu pascaoperasi, tanpa faktor risiko"],
  ["II", "Muncul 2–6 minggu pascaoperasi, tanpa faktor risiko"],
  ["IIIA", "Tipe I dengan ≥1 faktor risiko"],
  ["IIIB", "Tipe II dengan ≥1 faktor risiko"],
  ["IVA", "Tipe I, II, atau III setelah satu kali terapi gagal"],
  ["IVB", "Tipe I, II, atau III setelah lebih dari satu kali terapi gagal"],
  ["V", "Muncul pertama kali >6 minggu pascaoperasi"]
], "Faktor risiko: diabetes, obesitas, imunosupresi.", { k: "dsw deep sternal wound infection dehisensi" });

E("pairolero", "umum", "Pairolero", "Infeksi luka sternotomi menurut waktu", [
  ["1", "Hari-hari pertama: drainase serosanguinus, tanpa selulitis, osteomielitis, atau kostokondritis"],
  ["2", "Minggu-minggu pertama: mediastinitis purulen, selulitis, osteomielitis sering"],
  ["3", "Bulan sampai tahun: sinus kronik, osteomielitis/kostokondritis kronik"]
], "", { k: "sternum mediastinitis" });

E("efusi-perikard", "umum", "Efusi perikardium", "Ukuran pada ekokardiografi (ruang bebas-eko saat diastol)", [
  ["Ringan", "<10 mm"],
  ["Sedang", "10–20 mm"],
  ["Berat", ">20 mm"]
], "Tamponade adalah diagnosis hemodinamik, bukan ukuran: trias Beck (hipotensi, distensi vena jugularis, bunyi jantung menjauh), pulsus paradoksus, kolaps atrium/ventrikel kanan. Pasca-bedah jantung efusi sering terlokalisasi di posterior.", { h: ["Derajat", "Ukuran"], k: "tamponade perikardiosentesis" });

E("hipotermia", "umum", "Derajat hipotermia", "Konsensus henti sirkulasi pada bedah arkus aorta (Yan dkk. 2013)", [
  ["Ringan", "28,1–34 °C"],
  ["Sedang", "20,1–28 °C"],
  ["Dalam", "14,1–20 °C"],
  ["Sangat dalam", "≤14 °C"]
], "Suhu nasofaring. DHCA = Deep Hypothermic Circulatory Arrest; MHCA = Moderate Hypothermic Circulatory Arrest, biasanya dengan perfusi serebral antegrad.", { h: ["Derajat", "Suhu"], k: "dhca mhca acp scp circulatory arrest" });

/* ───────────── GAGAL JANTUNG & SYOK ───────────── */

E("nyha", "hf", "NYHA", "New York Heart Association Functional Class", [
  ["I", "Tanpa keterbatasan; aktivitas biasa tidak menimbulkan gejala"],
  ["II", "Keterbatasan ringan; nyaman saat istirahat, aktivitas biasa menimbulkan gejala"],
  ["III", "Keterbatasan nyata; aktivitas lebih ringan dari biasa menimbulkan gejala"],
  ["IV", "Gejala saat istirahat; setiap aktivitas menambah keluhan"]
], "", { h: ["Kelas", "Deskripsi"] });

E("hf-stage", "hf", "Stadium gagal jantung ACC/AHA", "American College of Cardiology / American Heart Association", [
  ["A", "Berisiko: ada faktor risiko, tanpa kelainan struktural dan tanpa gejala"],
  ["B", "Pra-gagal jantung: kelainan struktural atau biomarker meningkat, tanpa gejala"],
  ["C", "Gagal jantung simtomatik (sekarang atau pernah)"],
  ["D", "Gagal jantung lanjut: gejala refrakter, rawat inap berulang, kandidat terapi lanjut"]
], "", { h: ["Stadium", "Deskripsi"] });

E("lvef", "hf", "Gagal jantung menurut LVEF", "Left Ventricular Ejection Fraction (fraksi ejeksi ventrikel kiri)", [
  ["HFrEF", "Heart Failure with reduced Ejection Fraction: LVEF ≤40%"],
  ["HFmrEF", "Heart Failure with mildly reduced Ejection Fraction: LVEF 41–49%"],
  ["HFpEF", "Heart Failure with preserved Ejection Fraction: LVEF ≥50%"],
  ["HFimpEF", "Heart Failure with improved Ejection Fraction: sebelumnya ≤40%, kini >40%"]
], "", { h: ["Kategori", "Definisi"], k: "ef fraksi ejeksi" });

E("killip", "hf", "Killip", "Gagal jantung pada infark miokard akut", [
  ["I", "Tanpa tanda gagal jantung"],
  ["II", "Ronki basal, S3 gallop, atau peningkatan tekanan vena jugularis"],
  ["III", "Edema paru akut"],
  ["IV", "Syok kardiogenik"]
], "", { h: ["Kelas", "Temuan"] });

E("forrester", "hf", "Forrester", "Profil hemodinamik: indeks jantung vs tekanan baji", [
  ["I", "CI >2,2 dan PCWP <18: normal"],
  ["II", "CI >2,2 dan PCWP >18: kongesti paru tanpa hipoperfusi"],
  ["III", "CI <2,2 dan PCWP <18: hipoperfusi tanpa kongesti (hipovolemia, infark ventrikel kanan)"],
  ["IV", "CI <2,2 dan PCWP >18: syok kardiogenik"]
], "CI = Cardiac Index (L/menit/m²); PCWP = Pulmonary Capillary Wedge Pressure (mmHg). Padanan klinis: hangat-kering, hangat-basah, dingin-kering, dingin-basah.", { h: ["Kelas", "Hemodinamik"], k: "swan ganz low cardiac output lcos" });

E("scai", "hf", "SCAI SHOCK", "Society for Cardiovascular Angiography and Interventions — stadium syok kardiogenik", [
  ["A", "At risk: belum ada tanda syok, tetapi berisiko"],
  ["B", "Beginning: hipotensi atau takikardia relatif tanpa hipoperfusi"],
  ["C", "Classic: hipoperfusi yang memerlukan intervensi (inotropik, vasopresor, alat bantu mekanik)"],
  ["D", "Deteriorating: memburuk walau sudah diintervensi"],
  ["E", "Extremis: kolaps sirkulasi, sering dalam resusitasi atau didukung banyak intervensi"]
], "Tambahkan pengubah A bila ada henti jantung dengan cedera otak anoksik yang dikhawatirkan.", { h: ["Stadium", "Deskripsi"], k: "cardiogenic shock ecmo impella iabp" });

E("intermacs", "hf", "INTERMACS", "Interagency Registry for Mechanically Assisted Circulatory Support — profil gagal jantung lanjut", [
  ["1", "Syok kardiogenik kritis (crash and burn)"],
  ["2", "Memburuk progresif walau dengan inotropik (sliding fast)"],
  ["3", "Stabil tetapi bergantung inotropik"],
  ["4", "Gejala saat istirahat dengan terapi oral di rumah (frequent flyer)"],
  ["5", "Tidak toleran aktivitas; nyaman saat istirahat (housebound)"],
  ["6", "Aktivitas terbatas (walking wounded)"],
  ["7", "NYHA kelas III lanjut"]
], "", { h: ["Profil", "Deskripsi"], k: "lvad vad mcs transplant" });

E("vis", "hf", "VIS", "Vasoactive-Inotropic Score", [
  ["Dopamin", "dosis (µg/kg/menit) × 1"],
  ["Dobutamin", "dosis (µg/kg/menit) × 1"],
  ["Epinefrin", "dosis (µg/kg/menit) × 100"],
  ["Norepinefrin", "dosis (µg/kg/menit) × 100"],
  ["Milrinon", "dosis (µg/kg/menit) × 10"],
  ["Vasopresin", "dosis (unit/kg/menit) × 10.000"]
], "VIS = jumlah seluruh komponen. Nilai maksimum 24–48 jam pertama pascaoperasi berkorelasi dengan morbiditas dan mortalitas; ambang yang dipakai antar studi berbeda.", { h: ["Obat", "Bobot"], k: "inotropik vasopresor skor" });

E("ecmo", "hf", "Konfigurasi ECMO", "Extracorporeal Membrane Oxygenation", [
  ["VV", "Veno-venosa: dukungan paru saja; fungsi jantung harus adekuat"],
  ["VA perifer", "Veno-arterial lewat femoral: dukungan jantung dan paru; aliran retrograd di aorta"],
  ["VA sentral", "Kanulasi atrium kanan–aorta asendens; khas pada gagal lepas dari mesin pintas jantung-paru"],
  ["VAV", "Veno-arterio-venosa: tambahan kanula balik ke vena untuk mengatasi hipoksemia diferensial"]
], "Sindrom Harlequin (north-south): tubuh atas hipoksik pada VA perifer saat jantung pulih tetapi paru buruk → pantau saturasi tangan kanan.", { h: ["Mode", "Prinsip"], k: "ecls postcardiotomy harlequin" });

E("ishlt", "hf", "ISHLT 2004 — rejeksi seluler", "International Society for Heart and Lung Transplantation, biopsi endomiokard", [
  ["0R", "Tanpa rejeksi"],
  ["1R", "Ringan: infiltrat interstisial dan/atau perivaskular dengan maksimal 1 fokus kerusakan miosit"],
  ["2R", "Sedang: ≥2 fokus infiltrat dengan kerusakan miosit"],
  ["3R", "Berat: infiltrat difus dengan kerusakan miosit multifokal, ± edema, perdarahan, vaskulitis"]
], "Rejeksi yang diperantarai antibodi dinilai terpisah: pAMR (pathologic Antibody-Mediated Rejection) 0–3.", { h: ["Derajat", "Histologi"], k: "transplantasi jantung rejection" });

E("ph-grup", "hf", "Hipertensi pulmonal — grup klinis", "Klasifikasi WHO (World Health Organization) / ESC-ERS", [
  ["1", "Hipertensi arteri pulmonal (idiopatik, herediter, terkait penyakit jantung bawaan, penyakit jaringan ikat, dll.)"],
  ["2", "Akibat penyakit jantung kiri"],
  ["3", "Akibat penyakit paru dan/atau hipoksia"],
  ["4", "Akibat obstruksi arteri pulmonal, termasuk CTEPH (Chronic Thromboembolic Pulmonary Hypertension)"],
  ["5", "Mekanisme tidak jelas dan/atau multifaktorial"]
], "Definisi hemodinamik ESC/ERS (European Society of Cardiology / European Respiratory Society) 2022: mPAP (mean Pulmonary Artery Pressure) >20 mmHg. Prakapiler: PAWP (Pulmonary Artery Wedge Pressure) ≤15 mmHg dan PVR (Pulmonary Vascular Resistance) >2 Wood unit.", { h: ["Grup", "Etiologi"], k: "pah ph pulmonary hypertension" });

E("who-fc", "hf", "Kelas fungsional WHO", "World Health Organization Functional Class pada hipertensi pulmonal", [
  ["I", "Tanpa keterbatasan aktivitas fisik"],
  ["II", "Keterbatasan ringan; aktivitas biasa menimbulkan sesak, lelah, nyeri dada, atau hampir pingsan"],
  ["III", "Keterbatasan nyata; aktivitas ringan menimbulkan gejala"],
  ["IV", "Tidak mampu beraktivitas tanpa gejala; tanda gagal jantung kanan, gejala bisa saat istirahat"]
], "", { h: ["Kelas", "Deskripsi"] });

/* ───────────── KORONER ───────────── */

E("ccs", "koroner", "CCS", "Canadian Cardiovascular Society — derajat angina", [
  ["I", "Angina hanya pada aktivitas berat, cepat, atau lama"],
  ["II", "Keterbatasan ringan: berjalan >2 blok atau naik >1 lantai tangga dengan kecepatan normal"],
  ["III", "Keterbatasan nyata: berjalan 1–2 blok atau naik 1 lantai tangga"],
  ["IV", "Tidak mampu beraktivitas tanpa angina; bisa muncul saat istirahat"]
], "", { h: ["Kelas", "Deskripsi"], k: "angina pektoris" });

E("syntax", "koroner", "SYNTAX score", "Synergy between PCI with Taxus and Cardiac Surgery — kompleksitas anatomi koroner", [
  ["Rendah", "≤22"],
  ["Sedang", "23–32"],
  ["Tinggi", "≥33"]
], "PCI = Percutaneous Coronary Intervention. Makin tinggi skor, makin besar keunggulan CABG (Coronary Artery Bypass Grafting) atas PCI pada penyakit tiga pembuluh dan left main. SYNTAX II menambahkan variabel klinis.", { h: ["Tertil", "Skor"], k: "left main 3vd three vessel heart team" });

E("timi", "koroner", "TIMI flow", "Thrombolysis In Myocardial Infarction — derajat aliran koroner", [
  ["0", "Tanpa perfusi: kontras tidak melewati oklusi"],
  ["1", "Penetrasi tanpa perfusi: kontras lewat tetapi tidak mengisi distal"],
  ["2", "Perfusi parsial: distal terisi tetapi lambat"],
  ["3", "Perfusi penuh: aliran normal"]
], "", { h: ["Derajat", "Deskripsi"] });

E("lesi-acc", "koroner", "Tipe lesi ACC/AHA", "American College of Cardiology / American Heart Association — morfologi lesi koroner", [
  ["A", "Diskret <10 mm, konsentrik, mudah dicapai, sudut <45°, kontur halus, kalsifikasi minimal, bukan ostial, tanpa cabang besar, tanpa trombus"],
  ["B1", "Satu ciri tipe B: tubular 10–20 mm, eksentrik, tortuositas sedang, sudut 45–90°, kontur tidak rata, kalsifikasi sedang-berat, ostial, bifurkasi, ada trombus, oklusi total <3 bulan"],
  ["B2", "Dua atau lebih ciri tipe B"],
  ["C", "Difus >20 mm, tortuositas berat, sudut >90°, oklusi total >3 bulan, cabang besar tak bisa dilindungi, graft vena degeneratif"]
], "", { k: "pci angiografi" });

E("medina", "koroner", "Medina", "Klasifikasi lesi bifurkasi", [
  ["Digit 1", "Pembuluh utama proksimal"],
  ["Digit 2", "Pembuluh utama distal"],
  ["Digit 3", "Cabang samping"],
  ["Nilai", "1 = stenosis ≥50%; 0 = tidak ada"],
  ["Bifurkasi sejati", "1,1,1 · 1,0,1 · 0,1,1 (cabang utama dan cabang samping sama-sama terkena)"]
], "", { h: ["Unsur", "Makna"], k: "bifurkasi left main distal" });

E("rentrop", "koroner", "Rentrop", "Derajat pengisian kolateral koroner", [
  ["0", "Tanpa kolateral"],
  ["1", "Pengisian cabang samping tanpa mencapai segmen epikardial"],
  ["2", "Pengisian parsial segmen epikardial"],
  ["3", "Pengisian lengkap segmen epikardial"]
], "", { h: ["Derajat", "Deskripsi"], k: "cto kolateral" });

E("cad-rads", "koroner", "CAD-RADS", "Coronary Artery Disease Reporting and Data System (CT angiografi koroner)", [
  ["0", "0%: tanpa plak atau stenosis"],
  ["1", "1–24%: minimal"],
  ["2", "25–49%: ringan"],
  ["3", "50–69%: sedang"],
  ["4A", "70–99%: berat"],
  ["4B", "Left main ≥50% atau tiga pembuluh ≥70%"],
  ["5", "Oklusi total"],
  ["N", "Tidak dapat dinilai"]
], "", { h: ["Kategori", "Stenosis maksimal"], k: "ccta ct koroner" });

E("mi-udmi", "koroner", "Tipe infark miokard", "Fourth Universal Definition of Myocardial Infarction", [
  ["1", "Aterotrombosis: ruptur atau erosi plak"],
  ["2", "Ketidakseimbangan suplai dan kebutuhan oksigen"],
  ["3", "Kematian jantung dengan gejala iskemia sebelum biomarker tersedia"],
  ["4a", "Terkait PCI: troponin >5× batas atas normal + bukti iskemia baru"],
  ["4b", "Trombosis stent"],
  ["4c", "Restenosis"],
  ["5", "Terkait CABG: troponin >10× batas atas normal ≤48 jam + gelombang Q patologis baru, oklusi graft/koroner baru, atau kehilangan miokard viabel baru pada pencitraan"]
], "PCI = Percutaneous Coronary Intervention; CABG = Coronary Artery Bypass Grafting.", { k: "pmi perioperative myocardial infarction troponin" });

E("fitzgibbon", "koroner", "FitzGibbon", "Patensi graft pada angiografi", [
  ["A", "Paten sempurna, tanpa gangguan"],
  ["B", "Stenosis yang menyempitkan kaliber graft menjadi <50% dari diameter arteri target"],
  ["O", "Oklusi"]
], "Dinilai terpisah pada anastomosis proksimal, badan graft, dan anastomosis distal.", { h: ["Derajat", "Deskripsi"], k: "graft patency lima svg radial" });

E("becker", "koroner", "Becker & van Mantgem", "Ruptur dinding bebas ventrikel pasca-infark", [
  ["I", "Robekan celah mendadak, biasanya <24 jam, tanpa penipisan miokard"],
  ["II", "Erosi miokard infark, subakut"],
  ["III", "Penipisan dan aneurisma lalu perforasi, lambat"]
], "Komplikasi mekanis infark lain: ruptur septum ventrikel (simpel = anterior/apikal; kompleks = inferobasal, berkelok) dan ruptur muskulus papilaris (posteromedial lebih sering karena suplai darah tunggal).", { k: "komplikasi mekanik vsr free wall rupture" });

E("dominansi", "koroner", "Dominansi koroner", "Asal PDA (Posterior Descending Artery)", [
  ["Kanan", "PDA berasal dari RCA (Right Coronary Artery); paling sering"],
  ["Kiri", "PDA berasal dari LCx (Left Circumflex)"],
  ["Kodominan", "Sisi posterior diperdarahi RCA dan LCx bersama"]
], "", { h: ["Dominansi", "Definisi"] });

/* ───────────── KATUP ───────────── */

E("carpentier", "katup", "Carpentier", "Klasifikasi fungsional regurgitasi mitral menurut gerak daun katup", [
  ["I", "Gerak normal: dilatasi anulus, perforasi daun katup"],
  ["II", "Gerak berlebih: prolaps, ruptur atau elongasi korda / muskulus papilaris"],
  ["IIIa", "Gerak terbatas saat sistol dan diastol: reumatik, kalsifikasi"],
  ["IIIb", "Gerak terbatas saat sistol: iskemik, kardiomiopati dilatasi (tethering)"]
], "Trias Carpentier: etiologi → lesi → disfungsi. Tipe menentukan teknik repair.", { k: "mr mitral repair" });

E("segmen-mitral", "katup", "Segmen katup mitral", "Nomenklatur Carpentier", [
  ["A1 / P1", "Segmen lateral, dekat komisura anterolateral"],
  ["A2 / P2", "Segmen tengah"],
  ["A3 / P3", "Segmen medial, dekat komisura posteromedial"],
  ["AC / PC", "Komisura anterior (anterolateral) dan posterior (posteromedial)"]
], "P2 adalah lokasi prolaps tersering pada penyakit degeneratif.", { h: ["Segmen", "Letak"] });

E("degeneratif-mitral", "katup", "Spektrum degeneratif mitral", "Fibroelastic deficiency sampai penyakit Barlow", [
  ["FED", "Fibroelastic Deficiency: daun katup tipis, ruptur korda tunggal, prolaps satu segmen (umumnya P2), usia lebih tua, riwayat singkat"],
  ["Forme fruste", "Bentuk antara: jaringan berlebih pada sebagian segmen"],
  ["Barlow", "Jaringan miksomatosa berlebih, prolaps multisegmen kedua daun, anulus sangat lebar, usia lebih muda, riwayat murmur lama"]
], "", { h: ["Bentuk", "Ciri"], k: "prolaps mvp myxomatous" });

E("mr-derajat", "katup", "Regurgitasi mitral berat", "Kriteria kuantitatif ekokardiografi (MR primer)", [
  ["EROA", "Effective Regurgitant Orifice Area ≥0,40 cm²"],
  ["RVol", "Regurgitant Volume ≥60 mL/denyut"],
  ["RF", "Regurgitant Fraction ≥50%"],
  ["VC", "Vena Contracta ≥0,7 cm"],
  ["Pendukung", "Aliran balik sistolik vena pulmonalis, jet sentral >40% atrium kiri atau jet eksentrik yang menyapu dinding"]
], "Ambang MR sekunder berbeda antar pedoman (pedoman Eropa memakai nilai lebih rendah); nilai dipengaruhi kondisi beban saat pemeriksaan.", { h: ["Parameter", "Ambang berat"], k: "mr mitral regurgitation" });

E("ms-derajat", "katup", "Stenosis mitral", "Derajat menurut MVA (Mitral Valve Area)", [
  ["Progresif", "MVA >1,5 cm²"],
  ["Berat", "MVA ≤1,5 cm²; pressure half-time ≥150 mdet"],
  ["Sangat berat", "MVA ≤1,0 cm²; pressure half-time ≥220 mdet"]
], "Pembagian ACC/AHA 2014/2020. Pembagian lama: ringan >1,5; sedang 1,0–1,5; berat <1,0 cm². Gradien rerata bergantung pada laju jantung dan aliran.", { h: ["Derajat", "Kriteria"], k: "ms mitral stenosis reumatik" });

E("wilkins", "katup", "Skor Wilkins", "Kelayakan BMV (Balloon Mitral Valvuloplasty) pada stenosis mitral", [
  ["Mobilitas", "1–4: dari hanya ujung daun yang kaku sampai hampir tidak bergerak"],
  ["Penebalan daun", "1–4: dari mendekati normal (4–5 mm) sampai sangat tebal (>8–10 mm)"],
  ["Kalsifikasi", "1–4: dari satu area terang sampai kalsifikasi luas di seluruh daun"],
  ["Subvalvular", "1–4: dari penebalan minimal di bawah daun sampai pemendekan korda hingga muskulus papilaris"]
], "Total 4–16. Skor ≤8 → anatomi baik untuk BMV; skor tinggi, kalsifikasi komisura, trombus atrium kiri, atau MR sedang-berat mengarah ke bedah.", { h: ["Komponen", "Skor"], k: "pbmv ptmc ms" });

E("as-derajat", "katup", "Stenosis aorta", "Derajat hemodinamik", [
  ["Ringan", "Vmax 2,0–2,9 m/dtk; gradien rerata <20 mmHg; AVA >1,5 cm²"],
  ["Sedang", "Vmax 3,0–3,9 m/dtk; gradien rerata 20–39 mmHg; AVA 1,0–1,5 cm²"],
  ["Berat", "Vmax ≥4,0 m/dtk; gradien rerata ≥40 mmHg; AVA ≤1,0 cm² (indeks ≤0,6 cm²/m²)"],
  ["Sangat berat", "Vmax ≥5,0 m/dtk atau gradien rerata ≥60 mmHg"]
], "Vmax = kecepatan jet puncak; AVA = Aortic Valve Area.", { h: ["Derajat", "Kriteria"], k: "as aortic stenosis" });

E("as-stadium", "katup", "Stadium stenosis aorta ACC/AHA", "American College of Cardiology / American Heart Association", [
  ["A", "Berisiko: katup bikuspid, sklerosis aorta"],
  ["B", "Progresif: stenosis ringan-sedang"],
  ["C1", "Berat asimtomatik, fraksi ejeksi ventrikel kiri normal"],
  ["C2", "Berat asimtomatik, fraksi ejeksi ventrikel kiri <50%"],
  ["D1", "Berat simtomatik, gradien tinggi"],
  ["D2", "Berat simtomatik, low-flow low-gradient dengan fraksi ejeksi menurun"],
  ["D3", "Berat simtomatik, low-flow low-gradient paradoksal: fraksi ejeksi normal, stroke volume index <35 mL/m²"]
], "D2: ekokardiografi stres dobutamin untuk membedakan stenosis berat sejati dari pseudo-berat.", { h: ["Stadium", "Deskripsi"], k: "low flow low gradient dobutamin" });

E("ar-derajat", "katup", "Regurgitasi aorta", "Derajat kuantitatif ekokardiografi", [
  ["Ringan", "Lebar jet <25% LVOT; vena contracta <0,3 cm; RVol <30 mL; EROA <0,10 cm²"],
  ["Sedang", "Lebar jet 25–64% LVOT; vena contracta 0,3–0,6 cm; RVol 30–59 mL; EROA 0,10–0,29 cm²"],
  ["Berat", "Lebar jet ≥65% LVOT; vena contracta >0,6 cm; RVol ≥60 mL; EROA ≥0,30 cm²; aliran balik holodiastolik aorta abdominalis"]
], "LVOT = Left Ventricular Outflow Tract; RVol = Regurgitant Volume; EROA = Effective Regurgitant Orifice Area.", { h: ["Derajat", "Kriteria"], k: "ar ai aortic regurgitation insufisiensi" });

E("el-khoury", "katup", "El Khoury", "Klasifikasi fungsional regurgitasi aorta (untuk repair)", [
  ["Ia", "Gerak kuspis normal; dilatasi sinotubular junction dan aorta asendens"],
  ["Ib", "Gerak normal; dilatasi sinus Valsalva dan sinotubular junction (aneurisma root)"],
  ["Ic", "Gerak normal; dilatasi anulus (ventriculo-aortic junction)"],
  ["Id", "Gerak normal; perforasi kuspis"],
  ["II", "Prolaps kuspis (gerak berlebih)"],
  ["III", "Restriksi kuspis: penebalan, fibrosis, kalsifikasi"]
], "Analog klasifikasi Carpentier untuk mitral; lesi sering bergabung.", { k: "aortic valve repair david yacoub" });

E("sievers", "katup", "Sievers", "Katup aorta bikuspid", [
  ["0", "Tanpa raphe (bikuspid murni); subtipe lateral atau anteroposterior"],
  ["1", "Satu raphe: L-R (fusi kuspis koroner kiri dan kanan, tersering), R-N, atau N-L"],
  ["2", "Dua raphe"]
], "L = left coronary cusp, R = right coronary cusp, N = non-coronary cusp. Keterangan tambahan: fungsi dominan stenosis (S), insufisiensi (I), atau seimbang (B).", { k: "bav bicuspid" });

E("tr-derajat", "katup", "Regurgitasi trikuspid — skala 5 derajat", "Perluasan derajat oleh Hahn & Zamorano", [
  ["Ringan", "Vena contracta <3 mm; EROA <20 mm²"],
  ["Sedang", "Vena contracta 3–6,9 mm; EROA 20–39 mm²"],
  ["Berat", "Vena contracta 7–13 mm; EROA 40–59 mm²"],
  ["Masif", "Vena contracta 14–20 mm; EROA 60–79 mm²"],
  ["Torensial", "Vena contracta ≥21 mm; EROA ≥80 mm²"]
], "EROA = Effective Regurgitant Orifice Area metode PISA (Proximal Isovelocity Surface Area). Saat operasi jantung kiri, anuloplasti trikuspid umumnya dipertimbangkan pada dilatasi anulus ≥40 mm (>21 mm/m²).", { h: ["Derajat", "Kriteria"], k: "tr tricuspid" });

E("ppm", "katup", "Prosthesis-patient mismatch", "PPM menurut iEOA (indexed Effective Orifice Area)", [
  ["Aorta — tidak bermakna", "iEOA >0,85 cm²/m²"],
  ["Aorta — sedang", "iEOA 0,66–0,85 cm²/m²"],
  ["Aorta — berat", "iEOA ≤0,65 cm²/m²"],
  ["Mitral — tidak bermakna", "iEOA >1,2 cm²/m²"],
  ["Mitral — sedang", "iEOA 0,9–1,2 cm²/m²"],
  ["Mitral — berat", "iEOA <0,9 cm²/m²"]
], "Pada indeks massa tubuh ≥30 kg/m² ambang aorta diturunkan (sedang 0,56–0,70; berat ≤0,55 cm²/m²).", { h: ["Posisi — derajat", "Ambang"], k: "ppm prostesis" });

E("duke", "katup", "Kriteria Duke termodifikasi", "Diagnosis endokarditis infektif", [
  ["Mayor", "Kultur darah positif mikroorganisme tipikal (≥2 kultur terpisah) atau bakteremia persisten; Coxiella burnetii"],
  ["Mayor", "Bukti keterlibatan endokard: vegetasi, abses, dehisensi baru katup prostetik, atau regurgitasi katup baru"],
  ["Minor", "Predisposisi: kelainan jantung atau pengguna napza suntik"],
  ["Minor", "Demam ≥38 °C"],
  ["Minor", "Fenomena vaskular: emboli arteri, infark paru septik, aneurisma mikotik, perdarahan intrakranial, lesi Janeway"],
  ["Minor", "Fenomena imunologis: glomerulonefritis, nodus Osler, bercak Roth, faktor reumatoid"],
  ["Minor", "Bukti mikrobiologis yang tidak memenuhi kriteria mayor"],
  ["Definite", "2 mayor, atau 1 mayor + 3 minor, atau 5 minor"],
  ["Possible", "1 mayor + 1 minor, atau 3 minor"]
], "Versi Li dkk. 2000. Pembaruan Duke-ISCVID (International Society for Cardiovascular Infectious Diseases) 2023 menambahkan antara lain PET/CT, CT jantung, dan temuan intraoperatif. Indikasi bedah: gagal jantung, infeksi tidak terkontrol, pencegahan emboli.", { h: ["Kategori", "Kriteria"], k: "ie endokarditis vegetasi" });

E("jones", "katup", "Kriteria Jones 2015", "Diagnosis demam reumatik akut (populasi risiko sedang-tinggi)", [
  ["Mayor", "Karditis (klinis atau subklinis pada ekokardiografi)"],
  ["Mayor", "Artritis: poliartritis, monoartritis, atau poliartralgia"],
  ["Mayor", "Korea Sydenham"],
  ["Mayor", "Eritema marginatum"],
  ["Mayor", "Nodul subkutan"],
  ["Minor", "Monoartralgia; demam ≥38 °C; LED ≥30 mm/jam dan/atau CRP ≥3 mg/dL; interval PR memanjang"],
  ["Diagnosis", "Episode pertama: 2 mayor atau 1 mayor + 2 minor. Rekurens: juga 3 minor. Wajib ada bukti infeksi streptokokus grup A sebelumnya"]
], "Populasi risiko rendah memakai kriteria lebih ketat (mayor sendi hanya poliartritis; minor poliartralgia, demam ≥38,5 °C, LED ≥60 mm/jam). LED = Laju Endap Darah; CRP = C-Reactive Protein.", { h: ["Kategori", "Kriteria"], k: "rhd pjr reumatik" });

/* ───────────── AORTA ───────────── */

E("stanford", "aorta", "Stanford", "Diseksi aorta", [
  ["A", "Melibatkan aorta asendens, di mana pun lokasi robekan intima → emergensi bedah"],
  ["B", "Tidak melibatkan aorta asendens (distal dari arteri subklavia kiri)"],
  ["Non-A non-B", "Melibatkan arkus tanpa aorta asendens"]
], "", { k: "diseksi dissection" });

E("debakey", "aorta", "DeBakey", "Diseksi aorta menurut asal dan perluasan", [
  ["I", "Berawal di aorta asendens, meluas minimal sampai arkus, sering sampai aorta desendens"],
  ["II", "Terbatas pada aorta asendens"],
  ["IIIa", "Berawal di aorta desendens, terbatas di atas diafragma"],
  ["IIIb", "Berawal di aorta desendens, meluas ke bawah diafragma"]
], "", { k: "diseksi dissection" });

E("diseksi-waktu", "aorta", "Kronologi diseksi aorta", "Pembagian waktu sejak awitan", [
  ["Hiperakut", "<24 jam"],
  ["Akut", "≤14 hari (IRAD: 2–7 hari)"],
  ["Subakut", "15–90 hari (IRAD: 8–30 hari)"],
  ["Kronik", ">90 hari (IRAD: >30 hari)"]
], "Pembagian utama mengikuti ESC (European Society of Cardiology) 2014 dan SVS/STS; IRAD = International Registry of Acute Aortic Dissection.", { h: ["Fase", "Waktu"], k: "akut kronik" });

E("svs-sts-diseksi", "aorta", "SVS/STS 2020", "Society for Vascular Surgery / Society of Thoracic Surgeons — pelaporan diseksi aorta", [
  ["Tipe A", "Robekan masuk (entry tear) di zona 0"],
  ["Tipe B", "Robekan masuk di zona ≥1"],
  ["Subskrip P,D", "Zona paling proksimal (P) dan paling distal (D) yang terkena, mis. B₃,₁₀"]
], "Memakai zona aorta 0–11 (lihat entri Zona aorta).", { k: "diseksi tipe b zona" });

E("zona-aorta", "aorta", "Zona aorta", "Ishimaru (0–4) dan perluasan SVS (Society for Vascular Surgery) sampai 11", [
  ["0", "Aorta asendens sampai dengan arteri inominata"],
  ["1", "Antara arteri inominata dan arteri karotis komunis kiri, termasuk ostium karotis kiri"],
  ["2", "Mencakup ostium arteri subklavia kiri"],
  ["3", "2 cm pertama distal arteri subklavia kiri"],
  ["4", "Dari akhir zona 3 sampai pertengahan aorta desendens (setinggi T6)"],
  ["5", "Pertengahan aorta desendens sampai trunkus seliakus"],
  ["6–8", "6 trunkus seliakus; 7 arteri mesenterika superior; 8 arteri renalis"],
  ["9", "Aorta infrarenal"],
  ["10–11", "10 arteri iliaka komunis; 11 arteri iliaka eksterna"]
], "Dipakai untuk menyebut zona pendaratan proksimal TEVAR (Thoracic Endovascular Aortic Repair).", { h: ["Zona", "Batas"], k: "landing zone tevar ishimaru debranching" });

E("tem", "aorta", "TEM", "Type, Entry, Malperfusion (Sievers dkk. 2020)", [
  ["T", "Tipe: A, B, atau non-A non-B"],
  ["E0", "Robekan masuk tidak terlihat"],
  ["E1", "Robekan masuk di aorta asendens"],
  ["E2", "Robekan masuk di arkus"],
  ["E3", "Robekan masuk di aorta desendens"],
  ["M0", "Tanpa malperfusi"],
  ["M1", "Malperfusi koroner"],
  ["M2", "Malperfusi pembuluh supra-aorta"],
  ["M3", "Malperfusi spinal, viseral, renal, atau tungkai"]
], "Akhiran (+) bila ada gejala klinis malperfusi, (−) bila hanya temuan radiologis.", { h: ["Unsur", "Makna"], k: "diseksi" });

E("penn", "aorta", "Penn", "Presentasi iskemia pada diseksi aorta akut tipe A", [
  ["Aa", "Tanpa iskemia"],
  ["Ab", "Malperfusi cabang dengan iskemia organ lokal (stroke, tungkai, ginjal, mesenterika)"],
  ["Ac", "Kolaps sirkulasi dengan atau tanpa keterlibatan jantung"],
  ["Abc", "Iskemia lokal dan generalisata sekaligus"]
], "Kelas makin berat → mortalitas operatif makin tinggi.", { h: ["Kelas", "Deskripsi"], k: "malperfusi" });

E("malperfusi", "aorta", "Mekanisme malperfusi", "Obstruksi cabang pada diseksi aorta", [
  ["Dinamik", "Flap prolaps menutupi ostium cabang atau lumen sejati kolaps; sering membaik setelah robekan masuk ditutup"],
  ["Statik", "Diseksi meluas ke dalam cabang, ± trombosis lumen palsu; biasanya perlu stent atau bypass cabang"],
  ["Campuran", "Keduanya"]
], "", { h: ["Tipe", "Mekanisme"] });

E("svensson", "aorta", "Svensson", "Kelas sindrom aorta akut", [
  ["1", "Diseksi klasik dengan lumen sejati dan lumen palsu"],
  ["2", "Hematoma intramural, IMH (Intramural Hematoma)"],
  ["3", "Diseksi terbatas/halus: robekan intima dengan tonjolan tanpa flap panjang"],
  ["4", "Ulkus aterosklerotik penetrans, PAU (Penetrating Atherosclerotic Ulcer)"],
  ["5", "Iatrogenik atau traumatik"]
], "", { h: ["Kelas", "Lesi"], k: "aas imh pau" });

E("tbad-risiko", "aorta", "Diseksi tipe B — komplikata dan risiko tinggi", "Stratifikasi SVS/STS (Society for Vascular Surgery / Society of Thoracic Surgeons)", [
  ["Komplikata", "Ruptur atau malperfusi → TEVAR (Thoracic Endovascular Aortic Repair) segera"],
  ["Risiko tinggi", "Nyeri refrakter, hipertensi refrakter, efusi pleura berdarah, diameter aorta >40 mm, malperfusi radiologis saja, rawat ulang, robekan masuk di kurvatura minor, diameter lumen palsu >22 mm"],
  ["Tanpa komplikasi", "Tidak ada ruptur, malperfusi, maupun ciri risiko tinggi → terapi medis optimal dan pencitraan serial"]
], "", { h: ["Kelompok", "Ciri"], k: "tbad tevar" });

E("crawford", "aorta", "Crawford (modifikasi Safi)", "Luas aneurisma aorta torakoabdominal", [
  ["I", "Dari distal arteri subklavia kiri sampai di atas arteri renalis"],
  ["II", "Dari distal arteri subklavia kiri sampai bifurkasi aorta (terluas, risiko paraplegia tertinggi)"],
  ["III", "Dari sela iga ke-6 sampai bifurkasi aorta"],
  ["IV", "Dari diafragma (sela iga ke-12) sampai bifurkasi aorta: seluruh aorta abdominal"],
  ["V", "Dari sela iga ke-6 sampai di atas arteri renalis"]
], "Proteksi medula spinalis: drainase cairan serebrospinal, perfusi distal, reimplantasi arteri interkostal, hipotermia.", { h: ["Extent", "Batas"], k: "taaa torakoabdominal" });

E("endoleak", "aorta", "Endoleak", "Kebocoran pasca EVAR/TEVAR (Endovascular Aortic Repair / Thoracic EVAR)", [
  ["Ia", "Kebocoran di zona seal proksimal"],
  ["Ib", "Kebocoran di zona seal distal"],
  ["Ic", "Kebocoran di oklusi iliaka"],
  ["II", "Aliran retrograd dari cabang (lumbal, arteri mesenterika inferior, subklavia kiri)"],
  ["IIIa", "Pemisahan antar-komponen"],
  ["IIIb", "Robekan kain graft"],
  ["IV", "Porositas kain graft"],
  ["V", "Endotension: kantong membesar tanpa kebocoran terlihat"]
], "Tipe I dan III bertekanan tinggi → perbaiki. Tipe II umumnya diobservasi, diintervensi bila kantong membesar.", { k: "evar tevar" });

E("btai", "aorta", "SVS — cedera tumpul aorta torakalis", "Society for Vascular Surgery, BTAI (Blunt Thoracic Aortic Injury)", [
  ["I", "Robekan intima"],
  ["II", "Hematoma intramural"],
  ["III", "Pseudoaneurisma"],
  ["IV", "Ruptur"]
], "Derajat I umumnya konservatif (kontrol tekanan darah dan pencitraan ulang); derajat II–IV dipertimbangkan TEVAR (Thoracic Endovascular Aortic Repair). Lokasi tersering: ismus aorta.", { h: ["Derajat", "Lesi"], k: "trauma aorta" });

E("ambang-aorta", "aorta", "Ambang intervensi aneurisma aorta torakalis", "Ringkasan pedoman ACC/AHA 2022", [
  ["Root / asendens sporadik", "≥5,5 cm; ≥5,0 cm di pusat berpengalaman dengan tim aorta multidisiplin"],
  ["Sindrom Marfan", "≥5,0 cm; ≥4,5 cm bila ada faktor risiko (riwayat keluarga diseksi, pertumbuhan cepat, rencana hamil)"],
  ["Katup bikuspid", "≥5,5 cm; ≥5,0 cm di pusat berpengalaman dengan tim aorta multidisiplin"],
  ["Bersamaan operasi katup aorta", "≥5,0 cm; ≥4,5 cm di pusat berpengalaman"],
  ["Arkus / desendens", "≥5,5 cm (belum dicek silang)"],
  ["Pertumbuhan", "≥0,5 cm dalam 1 tahun, atau ≥0,3 cm/tahun dua tahun berturut-turut"],
  ["Simtomatik", "Intervensi tanpa melihat ukuran"]
], "Angka berbeda antar pedoman dan antar kelainan genetik (mis. Loeys-Dietz lebih rendah); pertimbangkan indeks terhadap tinggi badan pada pasien bertubuh kecil.", { h: ["Kondisi", "Ambang"], k: "aneurisma taa bentall david" });

E("katz", "aorta", "Katz", "Derajat ateroma aorta pada ekokardiografi transesofageal", [
  ["I", "Normal"],
  ["II", "Penebalan intima luas"],
  ["III", "Ateroma menonjol <5 mm"],
  ["IV", "Ateroma menonjol ≥5 mm"],
  ["V", "Ateroma mobil"]
], "Derajat IV–V: risiko stroke embolik saat kanulasi dan klem aorta → pindai epiaortik, ubah lokasi kanulasi, teknik no-touch.", { h: ["Derajat", "Temuan"], k: "ateroma porcelain epiaortic" });

E("tipe-arkus", "aorta", "Tipe arkus aorta", "Menurut jarak vertikal asal arteri inominata ke puncak arkus", [
  ["I", "<1 diameter arteri karotis komunis kiri"],
  ["II", "1–2 diameter"],
  ["III", ">2 diameter"]
], "Tipe III menyulitkan kanulasi pembuluh supra-aorta dan pendaratan endograft. Varian tersering: bovine arch (asal bersama inominata dan karotis kiri).", { k: "arch bovine" });

/* ───────────── KONGENITAL ───────────── */

E("asd", "kongenital", "ASD", "Atrial Septal Defect — tipe anatomi", [
  ["Sekundum", "Di fosa ovalis; tersering; dapat ditutup dengan alat bila rim memadai"],
  ["Primum", "Bagian dari defek septum atrioventrikular parsial; disertai cleft katup mitral"],
  ["Sinus venosus", "Superior (dekat vena kava superior) atau inferior; sering dengan anomali parsial aliran vena pulmonalis kanan"],
  ["Sinus koronarius", "Unroofed coronary sinus; sering dengan vena kava superior kiri persisten"]
], "", { k: "dsa defek septum atrium papvd" });

E("vsd", "kongenital", "VSD", "Ventricular Septal Defect — tipe anatomi", [
  ["Perimembran", "Tipe II; sekitar septum membranosa; tersering"],
  ["Outlet", "Tipe I; subarterial, suprakristal, doubly committed; risiko prolaps kuspis aorta dan regurgitasi aorta"],
  ["Inlet", "Tipe III; tipe kanal atrioventrikular"],
  ["Muskular", "Tipe IV; trabekular; bisa multipel (Swiss cheese)"]
], "Penomoran tipe I–IV mengikuti Kirklin.", { k: "dsv defek septum ventrikel" });

E("krichenko", "kongenital", "Krichenko", "Morfologi angiografi PDA (Patent Ductus Arteriosus)", [
  ["A", "Konus: ampula aorta jelas, menyempit di ujung pulmonal; tersering"],
  ["B", "Jendela: pendek, menyempit di ujung aorta"],
  ["C", "Tubular: tanpa penyempitan"],
  ["D", "Kompleks: penyempitan multipel"],
  ["E", "Memanjang: konus panjang dengan penyempitan jauh dari trakea"]
], "", { k: "pda duktus" });

E("avsd", "kongenital", "AVSD", "Atrioventricular Septal Defect — bentuk", [
  ["Parsial", "ASD primum dengan dua orifisium katup atrioventrikular terpisah dan cleft mitral; tanpa VSD"],
  ["Transisional", "ASD primum dengan VSD inlet kecil restriktif"],
  ["Komplit", "ASD primum, VSD inlet besar, dan satu katup atrioventrikular bersama"]
], "ASD = Atrial Septal Defect; VSD = Ventricular Septal Defect.", { k: "kanal av endocardial cushion down" });

E("rastelli", "kongenital", "Rastelli", "AVSD komplit menurut daun jembatan superior", [
  ["A", "Daun jembatan superior terbelah dan melekat ke puncak septum ventrikel lewat korda; tersering, terkait sindrom Down"],
  ["B", "Melekat ke muskulus papilaris anomali di ventrikel kanan; jarang"],
  ["C", "Mengambang bebas tanpa perlekatan ke septum; terkait tetralogi Fallot dan heterotaksi"]
], "AVSD = Atrioventricular Septal Defect.", { k: "avsd kanal" });

E("darling", "kongenital", "Darling", "TAPVC (Total Anomalous Pulmonary Venous Connection)", [
  ["I", "Suprakardiak: lewat vena vertikal ke vena inominata atau vena kava superior; tersering"],
  ["II", "Kardiak: ke sinus koronarius atau langsung ke atrium kanan"],
  ["III", "Infrakardiak: menembus diafragma ke vena porta atau duktus venosus; hampir selalu obstruktif"],
  ["IV", "Campuran"]
], "Bentuk obstruktif adalah emergensi bedah neonatus.", { k: "tapvd tapvr anomali vena pulmonalis" });

E("truncus", "kongenital", "Trunkus arteriosus", "Collett & Edwards dan Van Praagh", [
  ["CE I / VP A1", "Trunkus pulmonal pendek keluar dari trunkus lalu bercabang"],
  ["CE II / VP A2", "Kedua arteri pulmonalis keluar terpisah tetapi berdekatan dari dinding posterior"],
  ["CE III / VP A2", "Kedua arteri pulmonalis keluar terpisah jauh dari sisi lateral"],
  ["CE IV", "Tanpa arteri pulmonalis sejati; aliran paru dari kolateral aorta desendens (kini digolongkan atresia pulmonal dengan VSD)"],
  ["VP A3", "Satu arteri pulmonalis dari trunkus, satunya dari duktus atau kolateral"],
  ["VP A4", "Disertai hipoplasia atau interupsi arkus aorta"]
], "CE = Collett & Edwards; VP = Van Praagh.", { k: "truncus persistent" });

E("tga", "kongenital", "TGA — kelompok klinis", "Transposition of the Great Arteries (d-TGA)", [
  ["Septum utuh", "TGA-IVS (Intact Ventricular Septum): sianosis berat sejak lahir; arterial switch dalam minggu-minggu pertama sebelum ventrikel kiri mengalami dekondisi"],
  ["Dengan VSD", "Percampuran lebih baik, gagal jantung lebih awal; arterial switch dan tutup VSD (Ventricular Septal Defect)"],
  ["VSD + LVOTO", "Dengan obstruksi jalan keluar ventrikel kiri (Left Ventricular Outflow Tract Obstruction): Rastelli, REV (Réparation à l'Étage Ventriculaire), atau Nikaidoh"]
], "", { h: ["Kelompok", "Ciri dan operasi"], k: "transposisi jatene switch" });

E("dorv", "kongenital", "DORV", "Double Outlet Right Ventricle menurut letak VSD", [
  ["Subaortik", "Fisiologi seperti VSD; bila ada stenosis pulmonal seperti tetralogi Fallot; tersering"],
  ["Subpulmonal", "Anomali Taussig-Bing; fisiologi seperti transposisi"],
  ["Doubly committed", "VSD di bawah kedua katup semilunar"],
  ["Non-committed", "VSD jauh (remote) dari kedua katup; perbaikan biventrikular sulit"]
], "VSD = Ventricular Septal Defect.", { k: "taussig bing" });

E("atresia-trikuspid", "kongenital", "Atresia trikuspid", "Edwards & Burchell", [
  ["I", "Arteri besar berhubungan normal (sekitar 70%)"],
  ["II", "Dengan d-transposisi arteri besar"],
  ["III", "Dengan malposisi lain (l-transposisi, dll.)"],
  ["a", "Subtipe: atresia pulmonal"],
  ["b", "Subtipe: stenosis atau hipoplasia pulmonal"],
  ["c", "Subtipe: tanpa stenosis pulmonal (aliran paru berlebih)"]
], "Contoh: Ib = hubungan arteri besar normal dengan VSD (Ventricular Septal Defect) kecil dan stenosis pulmonal; tersering.", { k: "single ventricle fontan" });

E("ebstein", "kongenital", "Carpentier — anomali Ebstein", "Derajat atrialisasi ventrikel kanan", [
  ["A", "Volume ventrikel kanan sejati memadai"],
  ["B", "Bagian teratrialisasi besar; daun anterior bergerak bebas"],
  ["C", "Gerak daun anterior sangat terbatas; dapat menyumbat jalan keluar ventrikel kanan"],
  ["D", "Atrialisasi hampir total; tersisa komponen infundibulum kecil"]
], "Repair cone (da Silva) adalah teknik utama saat ini.", { k: "ebstein cone" });

E("pa-vsd", "kongenital", "Atresia pulmonal dengan VSD", "Tchervenkov / Congenital Heart Surgery Nomenclature", [
  ["A", "Arteri pulmonalis natif ada; aliran paru dari duktus; tanpa MAPCA"],
  ["B", "Arteri pulmonalis natif ada dan MAPCA ada"],
  ["C", "Tanpa arteri pulmonalis natif; aliran paru seluruhnya dari MAPCA"]
], "VSD = Ventricular Septal Defect; MAPCA = Major Aortopulmonary Collateral Arteries. Tipe B–C memerlukan unifokalisasi.", { k: "mapca unifokalisasi" });

E("iaa", "kongenital", "Celoria & Patton", "Interrupted Aortic Arch (interupsi arkus aorta)", [
  ["A", "Distal dari arteri subklavia kiri"],
  ["B", "Antara arteri karotis komunis kiri dan arteri subklavia kiri; tersering, terkait sindrom DiGeorge (delesi 22q11)"],
  ["C", "Antara arteri inominata dan arteri karotis komunis kiri; terjarang"]
], "", { k: "iaa arkus" });

E("koarktasio", "kongenital", "Koarktasio aorta", "Menurut letak terhadap duktus arteriosus", [
  ["Praduktal", "Tipe infantil; perfusi tubuh bawah bergantung duktus; sering dengan hipoplasia arkus"],
  ["Jukstaduktal", "Tepat di seberang insersi duktus; tersering"],
  ["Pascaduktal", "Tipe dewasa; kolateral berkembang (rib notching), hipertensi lengan"]
], "Gradien tekanan lengan-tungkai >20 mmHg umumnya dianggap bermakna.", { k: "coarctation coa" });

E("hlhs", "kongenital", "HLHS — subtipe anatomi", "Hypoplastic Left Heart Syndrome", [
  ["MA/AA", "Atresia mitral dan atresia aorta"],
  ["MS/AA", "Stenosis mitral dan atresia aorta; terkait fistula koroner-ventrikel"],
  ["MS/AS", "Stenosis mitral dan stenosis aorta"],
  ["MA/AS", "Atresia mitral dan stenosis aorta; biasanya dengan VSD (Ventricular Septal Defect)"]
], "", { k: "norwood hipoplastik" });

E("paliasi-univentrikel", "kongenital", "Tahapan paliasi univentrikel", "Jalur menuju sirkulasi Fontan", [
  ["Tahap 1", "Neonatus: atur aliran paru dan sistemik — shunt Blalock-Taussig-Thomas termodifikasi, banding arteri pulmonalis, atau Norwood (± shunt Sano)"],
  ["Tahap 2", "Usia 3–6 bulan: Glenn dua arah (anastomosis kavopulmonal superior) atau hemi-Fontan"],
  ["Tahap 3", "Usia 2–4 tahun: Fontan (anastomosis kavopulmonal total)"]
], "Tipe Fontan: atriopulmonal (klasik, ditinggalkan), lateral tunnel, dan konduit ekstrakardiak; dengan atau tanpa fenestrasi.", { h: ["Tahap", "Prosedur"], k: "fontan glenn norwood bdg tcpc single ventricle" });

E("shunt", "kongenital", "Shunt sistemik-pulmonal", "Paliasi untuk menambah aliran darah paru", [
  ["BT klasik", "Blalock-Taussig: arteri subklavia dipotong dan disambung ke arteri pulmonalis"],
  ["BT termodifikasi", "Graft PTFE (polytetrafluoroethylene) dari arteri subklavia atau inominata ke arteri pulmonalis; standar saat ini"],
  ["Sentral", "Graft dari aorta asendens ke arteri pulmonalis utama"],
  ["Waterston", "Aorta asendens ke arteri pulmonalis kanan; ditinggalkan"],
  ["Potts", "Aorta desendens ke arteri pulmonalis kiri; ditinggalkan untuk indikasi ini"]
], "", { k: "bts mbts paliatif" });

E("cincin-vaskular", "kongenital", "Cincin vaskular", "Anomali arkus yang menekan trakea dan esofagus", [
  ["Arkus aorta ganda", "Cincin komplit; tersering yang simtomatik; arkus kanan biasanya dominan"],
  ["Arkus kanan + subklavia kiri aberan", "Cincin komplit lewat ligamentum arteriosum kiri; sering dengan divertikulum Kommerell"],
  ["Sling arteri pulmonalis", "Arteri pulmonalis kiri berasal dari yang kanan, lewat di antara trakea dan esofagus; terkait cincin trakea komplit"],
  ["Kompresi arteri inominata", "Cincin tidak komplit; menekan trakea anterior"]
], "", { k: "vascular ring kommerell" });

E("heath-edwards", "kongenital", "Heath-Edwards", "Derajat histologi penyakit vaskular paru", [
  ["I", "Hipertrofi tunika media"],
  ["II", "Hipertrofi media dengan proliferasi seluler intima"],
  ["III", "Fibrosis intima oklusif (lamelar)"],
  ["IV", "Dilatasi arteri dan lesi pleksiform"],
  ["V", "Lesi angiomatoid, hemosiderosis"],
  ["VI", "Arteritis nekrotikans"]
], "Derajat I–III umumnya masih reversibel; IV–VI ireversibel (fisiologi Eisenmenger). Kini penilaian operabilitas lebih bertumpu pada kateterisasi dan uji vasoreaktivitas.", { h: ["Derajat", "Histologi"], k: "eisenmenger pvr operabilitas" });

E("mcgoon-nakata", "kongenital", "McGoon & Nakata", "Indeks ukuran arteri pulmonalis", [
  ["Rasio McGoon", "(diameter arteri pulmonalis kanan + kiri sebelum percabangan) ÷ diameter aorta desendens setinggi diafragma"],
  ["McGoon — tafsir", "Makin besar makin baik; ambang kelayakan koreksi total dan Fontan berbeda antar pusat (belum dicek silang ke sumber primer)"],
  ["Indeks Nakata", "(luas penampang arteri pulmonalis kanan + kiri, mm²) ÷ luas permukaan tubuh (m²)"],
  ["Nakata — tafsir", "Indeks >100 mm²/m² dilaporkan berkaitan dengan sintasan lebih baik setelah koreksi total tetralogi Fallot; ambang lain berbeda antar pusat"]
], "Ambang berbeda antar pusat; pakai protokol institusi.", { h: ["Indeks", "Rumus / tafsir"], k: "tof fallot pa index" });

E("rachs", "kongenital", "RACHS-1 dan STAT", "Stratifikasi risiko operasi jantung bawaan", [
  ["RACHS-1 kat. 1", "Penutupan ASD, ligasi PDA usia >30 hari, repair koarktasio usia >30 hari"],
  ["RACHS-1 kat. 2", "Penutupan VSD, penutupan ASD primum, koreksi total tetralogi Fallot, Glenn dua arah"],
  ["RACHS-1 kat. 3", "Arterial switch, Fontan, repair AVSD komplit, shunt sistemik-pulmonal"],
  ["RACHS-1 kat. 4", "Repair trunkus arteriosus, arterial switch dengan penutupan VSD"],
  ["RACHS-1 kat. 6", "Norwood, Damus-Kaye-Stansel"],
  ["STAT 1–5", "Kategori mortalitas empiris dari basis data STS dan EACTS; 1 = risiko terendah, 5 = tertinggi"]
], "RACHS-1 = Risk Adjustment for Congenital Heart Surgery; STAT = Society of Thoracic Surgeons – European Association for Cardio-Thoracic Surgery mortality categories. ASD = Atrial Septal Defect; VSD = Ventricular Septal Defect; PDA = Patent Ductus Arteriosus; AVSD = Atrioventricular Septal Defect. Kategori 5 hampir tidak pernah terisi. Daftar prosedur di sini hanya contoh.", { h: ["Kategori", "Contoh prosedur"], k: "aristotle risiko" });

/* ───────────── TORAKS ───────────── */

E("tnm-t", "toraks", "TNM paru — deskriptor T", "Kanker paru, edisi ke-8", [
  ["T1a", "≤1 cm"],
  ["T1b", ">1–2 cm"],
  ["T1c", ">2–3 cm"],
  ["T2a", ">3–4 cm; atau mengenai bronkus utama tanpa karina, pleura viseral, atau atelektasis/pneumonitis obstruktif sampai hilus"],
  ["T2b", ">4–5 cm"],
  ["T3", ">5–7 cm; atau invasi dinding dada, nervus frenikus, perikardium parietal; atau nodul terpisah di lobus yang sama"],
  ["T4", ">7 cm; atau invasi diafragma, mediastinum, jantung, pembuluh besar, trakea, nervus laringeus rekuren, esofagus, korpus vertebra, karina; atau nodul di lobus ipsilateral lain"]
], "Edisi ke-9 (berlaku 2025) tidak mengubah deskriptor T.", { h: ["T", "Kriteria"], k: "nsclc staging kanker paru" });

E("tnm-nm", "toraks", "TNM paru — deskriptor N dan M", "Kanker paru, edisi ke-8 dengan catatan edisi ke-9", [
  ["N0", "Tanpa metastasis kelenjar regional"],
  ["N1", "Peribronkial, hilus, atau intrapulmonal ipsilateral (stasiun 10–14)"],
  ["N2", "Mediastinum ipsilateral atau subkarina (stasiun 2–9). Edisi ke-9: N2a satu stasiun, N2b lebih dari satu stasiun"],
  ["N3", "Mediastinum atau hilus kontralateral, skalenus, atau supraklavikula"],
  ["M1a", "Nodul di paru kontralateral, nodul pleura/perikardium, atau efusi ganas"],
  ["M1b", "Satu metastasis ekstratoraks"],
  ["M1c", "Metastasis ekstratoraks multipel. Edisi ke-9: M1c1 satu sistem organ, M1c2 beberapa sistem organ"]
], "Pengelompokan stadium tidak dimuat di sini; lihat tabel IASLC (International Association for the Study of Lung Cancer).", { h: ["N / M", "Kriteria"], k: "nsclc staging mediastinoskopi" });

E("stasiun-kgb", "toraks", "Stasiun kelenjar getah bening IASLC", "International Association for the Study of Lung Cancer", [
  ["1", "Servikal bawah, supraklavikula, takik sternum"],
  ["2R / 2L", "Paratrakea atas"],
  ["3a / 3p", "Pravaskular / retrotrakea"],
  ["4R / 4L", "Paratrakea bawah"],
  ["5", "Subaorta (jendela aortopulmonal)"],
  ["6", "Para-aorta"],
  ["7", "Subkarina"],
  ["8", "Paraesofagus"],
  ["9", "Ligamentum pulmonale"],
  ["10", "Hilus"],
  ["11", "Interlobar"],
  ["12–14", "Lobar, segmental, subsegmental"]
], "Stasiun 1 = N3; 2–9 = N2 (ipsilateral); 10–14 = N1.", { h: ["Stasiun", "Lokasi"], k: "kgb lymph node diseksi" });

E("fungsi-paru", "toraks", "Kelayakan reseksi paru", "Algoritme ACCP (American College of Chest Physicians) 2013", [
  ["ppoFEV1 dan ppoDLCO >60%", "Risiko rendah; tidak perlu uji lanjut"],
  ["Salah satu <60%, keduanya >30%", "Uji latihan sederhana: naik tangga >22 m atau shuttle walk >400 m → risiko rendah"],
  ["Salah satu <30%", "Uji latih kardiopulmonal (CPET)"],
  ["VO₂ maks >20 mL/kg/menit", "Risiko rendah"],
  ["VO₂ maks 10–20 mL/kg/menit", "Risiko sedang"],
  ["VO₂ maks <10 mL/kg/menit", "Risiko tinggi; pertimbangkan reseksi sublobar atau terapi non-bedah"]
], "ppo = predicted postoperative; FEV1 = Forced Expiratory Volume in 1 second; DLCO = Diffusing capacity of the Lung for Carbon monoxide; CPET = Cardiopulmonary Exercise Test.", { h: ["Temuan", "Tafsir"], k: "lobektomi pneumonektomi spirometri" });

E("masaoka", "toraks", "Masaoka-Koga", "Stadium timoma", [
  ["I", "Berkapsul utuh secara makroskopis dan mikroskopis"],
  ["IIa", "Invasi transkapsular mikroskopis"],
  ["IIb", "Invasi makroskopis ke lemak timus/sekitar, atau melekat tanpa menembus pleura mediastinal atau perikardium"],
  ["III", "Invasi makroskopis ke organ sekitar (perikardium, pembuluh besar, paru)"],
  ["IVa", "Diseminasi pleura atau perikardium"],
  ["IVb", "Metastasis limfogen atau hematogen"]
], "", { h: ["Stadium", "Deskripsi"], k: "timoma thymoma timektomi" });

E("who-timoma", "toraks", "Histologi WHO timoma", "World Health Organization — tumor epitel timus", [
  ["A", "Sel spindel/oval, sedikit limfosit"],
  ["AB", "Campuran tipe A dan area kaya limfosit"],
  ["B1", "Kaya limfosit, menyerupai korteks timus normal"],
  ["B2", "Sel epitel poligonal lebih banyak di antara limfosit"],
  ["B3", "Dominan sel epitel poligonal dengan atipia ringan-sedang"],
  ["C", "Karsinoma timus"]
], "Agresivitas meningkat dari A ke C.", { k: "timoma thymoma" });

E("mgfa", "toraks", "MGFA", "Myasthenia Gravis Foundation of America — kelas klinis", [
  ["I", "Kelemahan otot okular saja"],
  ["II", "Kelemahan umum ringan"],
  ["III", "Kelemahan umum sedang"],
  ["IV", "Kelemahan umum berat"],
  ["V", "Intubasi, dengan atau tanpa ventilasi mekanik"],
  ["a / b", "Subkelas II–IV: a dominan ekstremitas/aksial; b dominan orofaring/pernapasan"]
], "Relevan untuk persiapan dan waktu timektomi.", { h: ["Kelas", "Deskripsi"], k: "miastenia timektomi" });

E("mediastinum", "toraks", "Kompartemen mediastinum", "ITMIG (International Thymic Malignancy Interest Group), berbasis CT", [
  ["Pravaskular", "Anterior: timoma, teratoma/tumor sel germinal, limfoma, struma substernal"],
  ["Viseral", "Tengah: kelenjar getah bening, kista bronkogenik/duplikasi, kelainan esofagus, jantung, pembuluh besar"],
  ["Paravertebral", "Posterior: tumor neurogenik (schwannoma, neurofibroma, ganglioneuroma)"]
], "", { h: ["Kompartemen", "Massa khas"], k: "massa mediastinum 4t" });

E("light", "toraks", "Kriteria Light", "Membedakan eksudat dari transudat", [
  ["1", "Rasio protein pleura/serum >0,5"],
  ["2", "Rasio LDH pleura/serum >0,6"],
  ["3", "LDH pleura >2/3 batas atas normal LDH serum"]
], "Eksudat bila memenuhi ≥1 kriteria. LDH = Lactate Dehydrogenase. Kilotoraks: trigliserida cairan >110 mg/dL (atau kilomikron positif).", { h: ["No.", "Kriteria"], k: "efusi pleura chylothorax" });

E("empiema", "toraks", "Stadium empiema", "ATS (American Thoracic Society)", [
  ["I — eksudatif", "Cairan encer mengalir bebas; hari-hari pertama → antibiotik dan drainase"],
  ["II — fibrinopurulen", "Fibrin, lokulasi, nanah; pH <7,20, glukosa <60 mg/dL, LDH >1000 IU/L → drainase, fibrinolitik, atau VATS"],
  ["III — organisasi", "Kulit fibrosa tebal, paru terperangkap; umumnya setelah beberapa minggu → dekortikasi"]
], "VATS = Video-Assisted Thoracoscopic Surgery.", { h: ["Stadium", "Ciri dan tindakan"], k: "empyema dekortikasi" });

E("rapid", "toraks", "Skor RAPID", "Renal, Age, Purulence, Infection source, Dietary factors — prognosis infeksi pleura", [
  ["Renal", "Ureum <5 mmol/L (BUN <14 mg/dL): 0; 5–8 mmol/L (BUN 14–23 mg/dL): 1; >8 mmol/L (BUN >23 mg/dL): 2"],
  ["Age", "Usia <50 tahun: 0; 50–70: 1; >70: 2"],
  ["Purulence", "Cairan purulen: 0; tidak purulen: 1"],
  ["Infection source", "Komunitas: 0; rumah sakit: 1"],
  ["Dietary", "Albumin ≥27 g/L (2,7 g/dL): 0; <27 g/L: 1"]
], "Total 0–2 risiko rendah; 3–4 sedang; 5–7 tinggi (mortalitas 3 bulan). BUN = Blood Urea Nitrogen.", { h: ["Komponen", "Poin"], k: "empiema" });

E("pneumotoraks", "toraks", "Pneumotoraks", "Jenis dan ukuran", [
  ["Spontan primer", "Tanpa penyakit paru yang diketahui; khas laki-laki muda tinggi kurus, bleb apikal"],
  ["Spontan sekunder", "Ada penyakit paru (PPOK, tuberkulosis, fibrosis kistik, dll.)"],
  ["Traumatik / iatrogenik", "Trauma tembus atau tumpul, tindakan medis"],
  ["Tension", "Diagnosis klinis: gangguan hemodinamik → dekompresi segera"],
  ["Besar (BTS 2010)", "Jarak tepi paru ke dinding dada >2 cm setinggi hilus"],
  ["Besar (ACCP)", "Jarak apeks paru ke kupula ≥3 cm"]
], "BTS = British Thoracic Society; ACCP = American College of Chest Physicians. Pedoman BTS 2023 lebih menekankan gejala daripada ukuran. Indikasi bedah: rekurens, kebocoran udara menetap, bilateral, pekerjaan berisiko.", { h: ["Kategori", "Definisi"], k: "pneumothorax wsd bullektomi pleurodesis" });

E("vanderschueren", "toraks", "Vanderschueren", "Temuan torakoskopi pada pneumotoraks spontan", [
  ["I", "Paru tampak normal"],
  ["II", "Perlekatan pleuropulmonal"],
  ["III", "Bleb atau bula <2 cm"],
  ["IV", "Bula >2 cm"]
], "", { h: ["Stadium", "Temuan"], k: "vats bleb bula" });

E("hemotoraks", "toraks", "Hemotoraks masif", "Indikasi torakotomi menurut ATLS (Advanced Trauma Life Support)", [
  ["Awal", "Drainase awal >1500 mL saat pemasangan selang dada"],
  ["Berlanjut", ">200 mL/jam selama 2–4 jam"],
  ["Klinis", "Kebutuhan transfusi berulang atau hemodinamik tidak stabil"]
], "Hemotoraks tertahan (retained) → evakuasi VATS (Video-Assisted Thoracoscopic Surgery) dini, idealnya dalam minggu pertama.", { h: ["Kriteria", "Batas"], k: "trauma toraks wsd" });

E("trauma-toraks", "toraks", "Trauma toraks ATLS", "Advanced Trauma Life Support — lethal six dan hidden six", [
  ["Lethal six", "Obstruksi jalan napas, tension pneumothorax, pneumotoraks terbuka, hemotoraks masif, flail chest dengan kontusio paru, tamponade jantung"],
  ["Hidden six", "Ruptur aorta traumatik, cedera trakeobronkial, kontusio miokard, ruptur diafragma, ruptur esofagus, kontusio paru"]
], "Lethal six dicari saat survei primer; hidden six saat survei sekunder. Flail chest: ≥3 iga berurutan patah di ≥2 tempat dengan gerak paradoksal.", { h: ["Kelompok", "Cedera"], k: "trauma dada flail" });

E("haller", "toraks", "Indeks Haller", "Derajat pektus ekskavatum pada CT", [
  ["Rumus", "Diameter transversal dalam rongga dada ÷ jarak anteroposterior sternum–vertebra di titik terdalam"],
  ["Normal", "Sekitar 2,5"],
  ["Bermakna", ">3,25 → salah satu kriteria koreksi (Nuss atau Ravitch)"]
], "Indeks koreksi (correction index) >10% dipakai sebagai pelengkap.", { h: ["Unsur", "Nilai"], k: "pectus excavatum nuss ravitch dinding dada" });

E("tos", "toraks", "Thoracic outlet syndrome", "Jenis menurut struktur yang terjepit", [
  ["Neurogenik", "Pleksus brakialis; >90% kasus; nyeri, parestesia, kelemahan"],
  ["Venosa", "Vena subklavia; trombosis akibat aktivitas (Paget-Schroetter)"],
  ["Arterial", "Arteri subklavia; terjarang; sering terkait iga servikal, aneurisma pascastenosis, emboli distal"]
], "", { h: ["Tipe", "Ciri"], k: "tos iga servikal skalenus" });

E("cotton-myer", "toraks", "Cotton-Myer", "Derajat stenosis subglotis/trakea", [
  ["I", "Obstruksi 0–50%"],
  ["II", "Obstruksi 51–70%"],
  ["III", "Obstruksi 71–99%"],
  ["IV", "Tanpa lumen"]
], "", { h: ["Derajat", "Obstruksi lumen"], k: "stenosis trakea pascaintubasi" });

E("cpam", "toraks", "Stocker", "CPAM (Congenital Pulmonary Airway Malformation)", [
  ["0", "Displasia asinar; letal"],
  ["1", "Kista besar >2 cm; tersering"],
  ["2", "Kista kecil <2 cm; sering dengan anomali lain"],
  ["3", "Mikrokistik, tampak padat"],
  ["4", "Kista besar perifer; tumpang tindih dengan blastoma pleuropulmonal"]
], "Sekuestrasi paru: intralobar (dalam pleura viseral yang sama, drainase ke vena pulmonalis) atau ekstralobar (pleura sendiri, drainase vena sistemik); suplai arteri sistemik.", { k: "ccam sekuestrasi kongenital paru" });

E("bronkiektasis", "toraks", "Reid", "Morfologi bronkiektasis", [
  ["Silindris", "Dilatasi seragam; teringan"],
  ["Varikosa", "Dilatasi tidak teratur berselang penyempitan"],
  ["Kistik (sakular)", "Dilatasi berbentuk kantong; terberat"]
], "", { k: "bronchiectasis hemoptisis" });

E("jamieson", "toraks", "Jamieson (UCSD)", "Klasifikasi intraoperatif CTEPH (Chronic Thromboembolic Pulmonary Hypertension)", [
  ["I", "Trombus di arteri pulmonalis utama atau lobar"],
  ["II", "Penebalan intima dan fibrosis proksimal dari arteri segmental"],
  ["III", "Penyakit hanya di cabang segmental distal dan subsegmental"],
  ["IV", "Vaskulopati arteriol distal tanpa penyakit tromboemboli yang terlihat; tidak dapat dioperasi"]
], "UCSD = University of California San Diego. Klasifikasi baru UCSD memakai level I–IV menurut lokasi awal bidang endarterektomi.", { k: "pea endarterektomi pulmonal" });

E("zargar", "toraks", "Zargar", "Derajat endoskopi cedera kaustik esofagus", [
  ["0", "Normal"],
  ["1", "Edema dan hiperemia mukosa"],
  ["2a", "Ulkus superfisial, erosi, eksudat, mukosa rapuh"],
  ["2b", "Seperti 2a ditambah ulkus dalam diskret atau sirkumferensial"],
  ["3a", "Nekrosis fokal tersebar"],
  ["3b", "Nekrosis luas"]
], "Derajat 2b–3 berisiko tinggi striktur; 3b berisiko perforasi dan mortalitas.", { h: ["Derajat", "Temuan"], k: "korosif esofagus" });

E("siewert", "toraks", "Siewert", "Adenokarsinoma esophagogastric junction", [
  ["I", "Pusat tumor 1–5 cm di atas junction: esofagus distal"],
  ["II", "Dari 1 cm di atas sampai 2 cm di bawah junction: kardia sejati"],
  ["III", "2–5 cm di bawah junction: subkardia"]
], "", { k: "esofagus egj esofagektomi" });

/* ───────────── VASKULAR ───────────── */

E("fontaine", "vaskular", "Fontaine", "Penyakit arteri perifer kronik", [
  ["I", "Asimtomatik"],
  ["IIa", "Klaudikasio pada jarak >200 m"],
  ["IIb", "Klaudikasio pada jarak <200 m"],
  ["III", "Nyeri saat istirahat"],
  ["IV", "Ulkus atau gangren"]
], "", { h: ["Stadium", "Klinis"], k: "pad pap klaudikasio" });

E("rutherford-kronik", "vaskular", "Rutherford — kronik", "Iskemia tungkai kronik", [
  ["0", "Asimtomatik"],
  ["1", "Klaudikasio ringan"],
  ["2", "Klaudikasio sedang"],
  ["3", "Klaudikasio berat"],
  ["4", "Nyeri iskemik saat istirahat"],
  ["5", "Kehilangan jaringan minor: ulkus tidak sembuh, gangren fokal"],
  ["6", "Kehilangan jaringan mayor: meluas di atas tingkat transmetatarsal"]
], "Kategori 4–6 = CLTI (Chronic Limb-Threatening Ischemia).", { h: ["Kategori", "Klinis"], k: "pad clti cli" });

E("rutherford-akut", "vaskular", "Rutherford — iskemia tungkai akut", "Viabilitas tungkai pada ALI (Acute Limb Ischemia)", [
  ["I", "Viabel: sensorik dan motorik normal; Doppler arteri terdengar"],
  ["IIa", "Terancam marginal: gangguan sensorik minimal (jari kaki) atau tidak ada, motorik normal; Doppler arteri sering tidak terdengar, vena terdengar → revaskularisasi segera"],
  ["IIb", "Terancam segera: gangguan sensorik melewati jari kaki dengan nyeri istirahat, kelemahan ringan-sedang; Doppler arteri tidak terdengar, vena terdengar → revaskularisasi emergensi"],
  ["III", "Ireversibel: anestesia dan paralisis luas, rigor; Doppler arteri dan vena tidak terdengar → amputasi"]
], "", { h: ["Kelas", "Temuan dan tindakan"], k: "ali embolektomi 6p" });

E("abi", "vaskular", "ABI", "Ankle-Brachial Index", [
  [">1,40", "Arteri tidak dapat dikompresi (kalsifikasi); pakai toe-brachial index"],
  ["1,00–1,40", "Normal"],
  ["0,91–0,99", "Ambang (borderline)"],
  ["0,41–0,90", "Penyakit arteri perifer ringan-sedang"],
  ["≤0,40", "Berat"]
], "", { h: ["Nilai", "Tafsir"], k: "pad tbi" });

E("wifi", "vaskular", "WIfI", "Wound, Ischemia, foot Infection (Society for Vascular Surgery)", [
  ["W 0–3", "0 tanpa ulkus; 1 ulkus kecil dangkal; 2 ulkus dalam (tulang, sendi, tendon terpapar) atau gangren terbatas jari; 3 ulkus/gangren luas kaki depan, tengah, atau tumit"],
  ["I 0", "ABI ≥0,80; tekanan pergelangan >100 mmHg; tekanan jari / TcPO₂ ≥60 mmHg"],
  ["I 1", "ABI 0,60–0,79; 70–100 mmHg; 40–59 mmHg"],
  ["I 2", "ABI 0,40–0,59; 50–70 mmHg; 30–39 mmHg"],
  ["I 3", "ABI ≤0,39; <50 mmHg; <30 mmHg"],
  ["fI 0–3", "0 tanpa infeksi; 1 lokal ringan (eritema ≤2 cm); 2 sedang (eritema >2 cm atau lebih dalam: abses, osteomielitis); 3 berat dengan respons inflamasi sistemik"]
], "ABI = Ankle-Brachial Index; TcPO₂ = tekanan oksigen transkutan. Kombinasi ketiganya memberi stadium klinis 1–4 untuk risiko amputasi dan manfaat revaskularisasi.", { h: ["Komponen", "Derajat"], k: "clti kaki diabetik" });

E("tasc", "vaskular", "TASC II", "Trans-Atlantic Inter-Society Consensus — morfologi lesi", [
  ["A", "Aortoiliaka: stenosis iliaka komunis, atau stenosis iliaka eksterna pendek ≤3 cm. Femoropoplitea: stenosis tunggal ≤10 cm atau oklusi tunggal ≤5 cm"],
  ["B", "Aortoiliaka: oklusi iliaka komunis unilateral, stenosis iliaka eksterna 3–10 cm, oklusi iliaka eksterna unilateral tanpa mengenai femoralis komunis. Femoropoplitea: lesi multipel masing-masing ≤5 cm, atau lesi tunggal ≤15 cm tanpa poplitea infragenikular"],
  ["C", "Aortoiliaka: oklusi iliaka komunis bilateral, lesi iliaka eksterna yang meluas ke femoralis komunis. Femoropoplitea: lesi multipel total >15 cm, atau rekuren setelah dua intervensi endovaskular"],
  ["D", "Aortoiliaka: oklusi aortoiliaka infrarenal, penyakit difus aorta dan kedua iliaka. Femoropoplitea: oklusi total femoralis komunis atau femoralis superfisial >20 cm yang mengenai poplitea, atau oklusi poplitea dan trifurkasi"]
], "Ringkasan; A cenderung endovaskular, D cenderung bedah terbuka. Untuk CLTI kini dipakai juga GLASS (Global Limb Anatomic Staging System).", { h: ["Tipe", "Lesi"], k: "pad bypass fem-pop" });

E("ceap", "vaskular", "CEAP", "Clinical, Etiology, Anatomy, Pathophysiology — penyakit vena kronik (revisi 2020)", [
  ["C0", "Tanpa tanda yang terlihat atau teraba"],
  ["C1", "Telangiektasis atau vena retikular"],
  ["C2", "Varises (C2r: rekuren)"],
  ["C3", "Edema"],
  ["C4a", "Pigmentasi atau eksim"],
  ["C4b", "Lipodermatosklerosis atau atrophie blanche"],
  ["C4c", "Corona phlebectatica"],
  ["C5", "Ulkus sembuh"],
  ["C6", "Ulkus aktif (C6r: rekuren)"]
], "E: kongenital (Ec), primer (Ep), sekunder (Es), tidak diketahui (En). A: superfisial (As), perforator (Ap), dalam (Ad). P: refluks (Pr), obstruksi (Po), keduanya (Pr,o). Tambahkan s (simtomatik) atau a (asimtomatik).", { h: ["Kelas", "Klinis"], k: "varises cvi insufisiensi vena" });

E("karotis", "vaskular", "Stenosis karotis", "NASCET dan kriteria dupleks konsensus SRU", [
  ["<50%", "PSV <125 cm/dtk; plak terlihat"],
  ["50–69%", "PSV 125–230 cm/dtk"],
  ["≥70%", "PSV >230 cm/dtk; kecepatan akhir diastolik >100 cm/dtk; rasio arteri karotis interna/komunis >4"],
  ["Hampir oklusi", "Lumen sangat sempit; kecepatan bisa tinggi, rendah, atau tak terukur"],
  ["Oklusi", "Tanpa aliran"]
], "NASCET = North American Symptomatic Carotid Endarterectomy Trial: % stenosis = (1 − diameter tersempit ÷ diameter arteri karotis interna distal normal) × 100. SRU = Society of Radiologists in Ultrasound; PSV = Peak Systolic Velocity. Simtomatik 50–99% → pertimbangkan endarterektomi, idealnya dalam 14 hari.", { h: ["Stenosis", "Kriteria dupleks"], k: "cea cas stroke" });

E("aaa", "vaskular", "Aneurisma aorta abdominal", "Definisi dan ambang intervensi", [
  ["Definisi", "Diameter ≥3,0 cm atau ≥1,5× diameter normal"],
  ["Laki-laki", "Perbaikan elektif pada ≥5,5 cm"],
  ["Perempuan", "Perbaikan elektif pada ≥5,0 cm"],
  ["Pertumbuhan cepat", ">1 cm per tahun (atau >0,5 cm per 6 bulan)"],
  ["Simtomatik / ruptur", "Intervensi segera tanpa melihat ukuran"],
  ["Perifer", "Aneurisma poplitea ≥2,0 cm; aneurisma iliaka ≥3,5 cm"]
], "Ambang mengikuti pedoman SVS (Society for Vascular Surgery) dan ESVS (European Society for Vascular Surgery); ada perbedaan kecil antar pedoman.", { h: ["Kondisi", "Ambang"], k: "aaa evar" });

E("trauma-vaskular", "vaskular", "Tanda cedera vaskular", "Hard signs dan soft signs pada trauma ekstremitas", [
  ["Hard signs", "Perdarahan pulsatil, hematoma meluas, nadi distal hilang, thrill atau bruit, tanda iskemia distal (6P) → eksplorasi segera"],
  ["Soft signs", "Riwayat perdarahan di lokasi kejadian, nadi melemah, luka dekat pembuluh besar, defisit saraf, hematoma tidak meluas → periksa indeks tekanan dan pencitraan"],
  ["Indeks tekanan arteri", "<0,9 → CT angiografi"]
], "6P: pain, pallor, pulselessness, paresthesia, paralysis, poikilothermia.", { h: ["Kelompok", "Tanda"], k: "trauma arteri" });

E("pe-esc", "vaskular", "Emboli paru — stratifikasi risiko ESC", "European Society of Cardiology 2019", [
  ["Tinggi", "Hemodinamik tidak stabil (henti jantung, syok obstruktif, atau hipotensi menetap) → reperfusi segera; embolektomi bedah bila trombolisis gagal atau kontraindikasi"],
  ["Sedang-tinggi", "Stabil; disfungsi ventrikel kanan pada pencitraan dan troponin meningkat"],
  ["Sedang-rendah", "Stabil; salah satu atau tidak ada dari keduanya, dengan PESI kelas III–V atau sPESI ≥1"],
  ["Rendah", "PESI kelas I–II atau sPESI 0, tanpa disfungsi ventrikel kanan"]
], "PESI = Pulmonary Embolism Severity Index; sPESI = simplified PESI.", { h: ["Risiko", "Kriteria"], k: "pe emboli paru embolektomi" });

E("avf", "vaskular", "Akses hemodialisis", "Jenis fistula arteriovenosa dan kriteria maturasi", [
  ["Radiosefalika", "Brescia-Cimino di pergelangan; pilihan pertama"],
  ["Brakiosefalika", "Di siku; pilihan kedua"],
  ["Brakiobasilika", "Dengan transposisi vena basilika; satu atau dua tahap"],
  ["Graft", "Prostetik bila vena tidak memadai"],
  ["Aturan 6", "Matur bila pada 6 minggu: aliran >600 mL/menit, diameter vena >6 mm, kedalaman <6 mm"]
], "Urutan umum: distal sebelum proksimal, lengan non-dominan dulu, vena autogen sebelum graft.", { h: ["Jenis", "Keterangan"], k: "av shunt cimino hd" });

E("haidi", "vaskular", "HAIDI", "Hemodialysis Access-Induced Distal Ischemia (steal syndrome)", [
  ["I", "Tangan pucat/kebiruan dan/atau dingin tanpa nyeri"],
  ["II", "Nyeri saat aktivitas atau saat dialisis"],
  ["III", "Nyeri saat istirahat"],
  ["IV", "Ulkus, nekrosis, atau gangren"]
], "Derajat III–IV perlu intervensi: banding, DRIL (Distal Revascularization–Interval Ligation), RUDI (Revision Using Distal Inflow), proksimalisasi inflow, atau ligasi.", { h: ["Derajat", "Klinis"], k: "steal avf" });

E("isl", "vaskular", "ISL", "International Society of Lymphology — stadium limfedema", [
  ["0", "Laten/subklinis: transpor limfe terganggu tanpa bengkak"],
  ["I", "Edema pitting yang berkurang dengan elevasi"],
  ["II", "Elevasi jarang mengurangi bengkak; pitting nyata, pada tahap lanjut menghilang karena fibrosis"],
  ["III", "Elefantiasis limfostatik: tanpa pitting, perubahan kulit trofik"]
], "", { h: ["Stadium", "Klinis"], k: "limfedema" });

E("schobinger", "vaskular", "Schobinger", "Stadium klinis malformasi arteriovenosa", [
  ["I", "Tenang: hangat, kemerahan, pirau pada Doppler"],
  ["II", "Ekspansi: membesar, berdenyut, thrill, bruit"],
  ["III", "Destruksi: nyeri, ulkus, perdarahan, nekrosis"],
  ["IV", "Dekompensasi: gagal jantung curah tinggi"]
], "Anomali vaskular menurut ISSVA (International Society for the Study of Vascular Anomalies): tumor (mis. hemangioma) vs malformasi; malformasi aliran lambat (kapiler, vena, limfatik) vs aliran cepat (arteri, arteriovenosa).", { h: ["Stadium", "Klinis"], k: "avm malformasi vaskular hemangioma" });

E("wagner", "vaskular", "Wagner", "Ulkus kaki diabetik", [
  ["0", "Kulit utuh, kaki berisiko"],
  ["1", "Ulkus superfisial"],
  ["2", "Ulkus dalam sampai tendon, kapsul, atau tulang"],
  ["3", "Ulkus dalam dengan abses atau osteomielitis"],
  ["4", "Gangren kaki depan"],
  ["5", "Gangren seluruh kaki"]
], "", { h: ["Derajat", "Deskripsi"], k: "kaki diabetik dfu" });

E("numano", "vaskular", "Numano", "Klasifikasi angiografi arteritis Takayasu", [
  ["I", "Cabang-cabang arkus aorta"],
  ["IIa", "Aorta asendens, arkus, dan cabangnya"],
  ["IIb", "IIa ditambah aorta torakalis desendens"],
  ["III", "Aorta torakalis desendens, aorta abdominalis, dan/atau arteri renalis"],
  ["IV", "Aorta abdominalis dan/atau arteri renalis"],
  ["V", "Gabungan IIb dan IV"]
], "Akhiran C(+) bila arteri koroner terkena, P(+) bila arteri pulmonalis terkena.", { k: "takayasu vaskulitis" });

E("shionoya", "vaskular", "Kriteria Shionoya", "Diagnosis tromboangitis obliterans (penyakit Buerger)", [
  ["1", "Riwayat merokok"],
  ["2", "Awitan sebelum usia 50 tahun"],
  ["3", "Oklusi arteri infrapoplitea"],
  ["4", "Keterlibatan ekstremitas atas atau flebitis migrans"],
  ["5", "Tanpa faktor risiko aterosklerosis selain merokok"]
], "Kelima kriteria harus terpenuhi.", { h: ["No.", "Kriteria"], k: "buerger tao" });

/* ───────────── TAMBAHAN 2026-11-18 (topik dari daftar periksa Buku Sakti; isi ditulis ulang dan dicek ke sumber daring) ───────────── */

E("syok-atls", "umum", "Kelas syok hemoragik ATLS", "Advanced Trauma Life Support — perkiraan kehilangan darah (dewasa ±70 kg)", [
  ["Kelas I", "Kehilangan <15% (<750 mL); nadi <100; tekanan darah normal; napas 14–20; sedikit cemas"],
  ["Kelas II", "15–30% (750–1500 mL); nadi >100; tekanan darah normal, tekanan nadi menyempit; napas 20–30; cemas"],
  ["Kelas III", "30–40% (1500–2000 mL); nadi >120; tekanan darah turun; napas 30–40; produksi urin turun; gelisah, bingung"],
  ["Kelas IV", ">40% (>2000 mL); nadi >140; tekanan darah sangat turun; napas >35; urin sangat sedikit; letargi"]
], "Edisi ATLS ke-10 memakai tanda panah dan menambahkan defisit basa (I: 0 s.d. −2; II: −2 s.d. −6; III: −6 s.d. −10; IV: ≤−10 mEq/L) serta kebutuhan produk darah (IV: protokol transfusi masif). Laju nadi saja tidak andal sebagai penanda derajat perdarahan.", { h: ["Kelas", "Temuan"], k: "trauma perdarahan hemoragik hipovolemik transfusi masif" });

E("euroscore2", "umum", "EuroSCORE II", "European System for Cardiac Operative Risk Evaluation II — 18 variabel prediktor mortalitas", [
  ["Faktor pasien", "Usia; jenis kelamin; fungsi ginjal (klirens kreatinin Cockcroft-Gault >85, 51–85, ≤50 mL/menit, atau dialisis); arteriopati ekstrakardiak; mobilitas buruk; riwayat operasi jantung (membuka perikardium); penyakit paru kronik; endokarditis aktif; keadaan kritis praoperasi; diabetes dengan insulin"],
  ["Faktor jantung", "Kelas NYHA (New York Heart Association); angina CCS (Canadian Cardiovascular Society) kelas 4; fungsi ventrikel kiri (LVEF); infark miokard ≤90 hari; hipertensi pulmonal"],
  ["Faktor operasi", "Urgensi (elektif, urgen, emergensi); bobot operasi (CABG terisolasi sebagai acuan; operasi yang lebih besar dinilai lebih berat); operasi aorta torakalis"],
  ["Keadaan kritis", "Pada rawat inap yang sama sebelum operasi, antara lain: takikardia atau fibrilasi ventrikel, henti jantung yang teratasi, pijat jantung, ventilasi mekanik sebelum masuk ruang anestesi (daftar lengkap di kalkulator resmi)"]
], "Model regresi logistik; hasilnya persen mortalitas di rumah sakit. Hitung di kalkulator resmi euroscore.org. Dibandingkan EuroSCORE klasik, versi II mengurangi estimasi berlebih pada pasien risiko tinggi.", { h: ["Kelompok", "Variabel"], k: "risiko bedah jantung euroscore sts mortalitas" });

E("wells-dvt", "vaskular", "Skor Wells DVT", "Probabilitas klinis trombosis vena dalam (versi revisi, dua tingkat)", [
  ["Kanker aktif", "Terapi dalam 6 bulan terakhir atau paliatif — 1"],
  ["Imobilisasi tungkai", "Paralisis, paresis, atau gips tungkai bawah baru — 1"],
  ["Tirah baring / operasi", "Tirah baring ≥3 hari atau operasi besar dengan anestesi regional/umum dalam 12 minggu — 1"],
  ["Nyeri tekan", "Nyeri tekan terlokalisasi sepanjang vena dalam — 1"],
  ["Seluruh tungkai bengkak", "1"],
  ["Betis bengkak", "Selisih ≥3 cm dibanding sisi asimtomatik, diukur 10 cm di bawah tuberositas tibia — 1"],
  ["Edema pitting", "Hanya pada tungkai yang bergejala — 1"],
  ["Vena kolateral", "Vena superfisial kolateral (bukan varises) — 1"],
  ["Riwayat DVT", "DVT yang pernah terdokumentasi — 1"],
  ["Diagnosis lain", "Diagnosis lain sama mungkin atau lebih mungkin daripada DVT — −2"]
], "Rentang skor −2 sampai 9. ≥2 = DVT likely (lanjut USG dupleks); ≤1 = unlikely (D-dimer). DVT = Deep Vein Thrombosis. Sensitivitasnya tidak cukup untuk dipakai sendirian.", { h: ["Kriteria", "Keterangan — poin"], k: "dvt tvd trombosis vena dalam d-dimer" });

E("shields", "toraks", "Shields — kompartemen mediastinum", "Pembagian tiga zona yang paling sering dipakai ahli bedah", [
  ["Anterior (pravaskular)", "Di depan perikardium dan pembuluh besar: timus, kelenjar getah bening, jaringan lemak, pembuluh mammaria interna; massa khas timoma, limfoma, tumor sel germinal, struma substernal"],
  ["Viseral (tengah)", "Perikardium, jantung, pembuluh besar, trakea dan bronkus utama, esofagus, kelenjar paratrakea dan subkarina; massa khas limfadenopati, kista bronkogenik/duplikasi"],
  ["Sulkus paravertebral (posterior)", "Kedua talang paravertebral: rantai simpatis, saraf interkostal, pembuluh interkostal proksimal; massa khas tumor neurogenik"]
], "Model ITMIG (International Thymic Malignancy Interest Group) memakai tiga kompartemen serupa berbasis batas CT (lihat entri Kompartemen mediastinum). Pembagian empat kompartemen klasik (superior, anterior, tengah, posterior) lain lagi; jangan dicampur saat menjawab soal.", { h: ["Zona", "Isi dan massa khas"], k: "mediastinum kompartemen shields massa tumor" });

/* ───────────── SUMBER CEK SILANG ─────────────
   id: [nama sumber, URL, bagian yang dicek]. Entri tanpa baris di sini BELUM dicek silang. */
const SOURCES = {
  "syok-atls": ["Tabel kelas perdarahan ACS/ATLS (PMC2151863); pembaruan edisi ke-10 di pedoman perdarahan Eropa", "https://pmc.ncbi.nlm.nih.gov/articles/PMC2151863/table/T2", "kehilangan darah, nadi, tekanan darah, napas, urin; defisit basa edisi ke-10"],
  "euroscore2": ["Kalkulator resmi EuroSCORE II", "https://euroscore.org/index.php?id=17", "daftar variabel per kelompok; definisi keadaan kritis dan fungsi ginjal dari QxMD"],
  "wells-dvt": ["Skor Wells DVT dua tingkat (GPnotebook)", "https://gpnotebook.com/pages/cardiovascular-medicine/two-level-wells-score-for-dvt", "seluruh kriteria, poin, dan ambang"],
  "shields": ["Telaah kompartemen mediastinum (RadioGraphics 2017)", "https://pubs.rsna.org/doi/full/10.1148/rg.2017160095", "Shields sebagai skema klinis tersering dan tiga zonanya; rincian isi tiap zona belum"],
  "udpb": ["Dyke dkk. 2014 (PubMed 24332097)", "https://pubmed.ncbi.nlm.nih.gov/24332097/", "struktur definisi dan kelas 0–2; angka kelas 3–4 belum"],
  "sts-risk": ["Pedoman katup AHA/ACC 2014, tabel penilaian risiko", "https://eguideline.guidelinecentral.com/i/362024/2", "seluruh ambang"],
  "ambang-aorta": ["Pedoman aorta ACC/AHA 2022 (PMC9860464)", "https://pmc.ncbi.nlm.nih.gov/articles/PMC9860464", "root/asendens, Marfan, bikuspid, laju pertumbuhan; arkus/desendens belum"],
  "tnm-t": ["IASLC edisi ke-9 (Radiopaedia)", "https://radiopaedia.org/articles/lung-cancer-staging-iaslc-9th-edition?lang=us", "tidak ada perubahan T di edisi ke-9; rincian tiap T belum"],
  "tnm-nm": ["Telaah TNM edisi ke-9 (PMC12401156)", "https://pmc.ncbi.nlm.nih.gov/articles/PMC12401156", "N2a/N2b dan M1c1/M1c2"],
  "el-oakley": ["El Oakley & Wright 1996, dikutip di PMC7951489", "https://pmc.ncbi.nlm.nih.gov/articles/PMC7951489/table/t2", "seluruh tipe"],
  "hipotermia": ["Yan dkk. 2013 (PMC3741839)", "https://pmc.ncbi.nlm.nih.gov/articles/PMC3741839/table/t1", "seluruh rentang suhu"],
  "rachs": ["RACHS-1 (Jenkins dkk. 2002), daftar kategori", "https://medicalalgorithms.com/categories-in-risk-adjustment-for-congenital-heart-surgery-1-rachs-1", "contoh prosedur kategori 1–6; STAT belum"],
  "tbad-risiko": ["Standar pelaporan SVS/STS 2020, dikutip di PMC11196166", "https://pmc.ncbi.nlm.nih.gov/articles/PMC11196166/table/table-2", "komplikata dan ciri risiko tinggi"],
  "diseksi-waktu": ["Standar pelaporan SVS/STS 2020, dikutip di PMC10000326", "https://pmc.ncbi.nlm.nih.gov/articles/PMC10000326", "pembagian SVS/STS; angka IRAD belum"],
  "svs-sts-diseksi": ["Standar pelaporan SVS/STS 2020, dikutip di PMC10000326", "https://pmc.ncbi.nlm.nih.gov/articles/PMC10000326", "tipe B = robekan masuk di zona ≥1, subskrip proksimal-distal"],
  "tr-derajat": ["Go dkk. 2018 (PMC6237828)", "https://pmc.ncbi.nlm.nih.gov/articles/PMC6237828", "ambang berat, masif, torensial"],
  "rapid": ["Studi PILOT, Corcoran dkk. 2020 (PubMed 32675200)", "https://pubmed.ncbi.nlm.nih.gov/32675200", "komponen, poin, dan kategori risiko"],
  "wifi": ["Tabel iskemia WIfI (PMC8365864)", "https://pmc.ncbi.nlm.nih.gov/articles/PMC8365864/table/T5", "derajat iskemia; derajat luka dan infeksi belum"],
  "penn": ["Kimura dkk. 2014 (PubMed 24484863)", "https://pubmed.ncbi.nlm.nih.gov/24484863/", "seluruh kelas"],
  "fungsi-paru": ["Pedoman ACCP 2013, dirangkum di PMC5124597", "https://pmc.ncbi.nlm.nih.gov/articles/PMC5124597", "seluruh ambang"],
  "ppm": ["Telaah PPM, kriteria VARC-3 (PMC11148752)", "https://pmc.ncbi.nlm.nih.gov/articles/PMC11148752", "posisi aorta termasuk ambang obesitas; posisi mitral belum"],
  "jones": ["Kriteria Jones 2015 (PMC4832790)", "https://pmc.ncbi.nlm.nih.gov/articles/PMC4832790", "kriteria mayor, minor, dan aturan diagnosis"],
  "barc": ["Definisi BARC (Mehran dkk. 2011), tabel", "https://trialsjournal.biomedcentral.com/articles/10.1186/s13063-020-04859-1/tables/2", "tipe 3a–4"],
  "ms-derajat": ["Stadium stenosis mitral (PMC11218416)", "https://pmc.ncbi.nlm.nih.gov/articles/PMC11218416/table/Tab2", "luas katup dan pressure half-time"],
  "karotis": ["Kriteria konsensus SRU (PMC3250265)", "https://pmc.ncbi.nlm.nih.gov/articles/PMC3250265/table/Tab3", "kriteria dupleks"],
  "mcgoon-nakata": ["Abbaszadeh dkk. 2023 (PMC10684472)", "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10684472/", "rumus kedua indeks; ambang kelayakan operasi belum"],
  "heath-edwards": ["Pathology Outlines, plexiform arteriopathy", "https://www.pathologyoutlines.com/topic/lungnontumorpulmonaryhyperplexart.html", "derajat I, II, dan lesi pleksiform; derajat lain belum"]
};
DATA.forEach(function (d) { d.src = SOURCES[d.id] || null; });

/* ───────────── PEMBAGIAN SEMESTER ─────────────
   Tahap dan nama modul: Buku Kurikulum PPDS-1 BTKV FKUI 2022, Tabel 5 dan daftar modul per semester.
   Pemetaan klasifikasi → semester di bawah adalah bantuan belajar (bukan isi buku kurikulum):
   buku hanya menyebut nama modul, tidak merinci penyakit per modul. Klasifikasi jantung dewasa
   muncul di semester IV, VII, dan IX karena buku tidak membaginya antar ketiga semester itu. */
const SEMS = [
  { id: "1", r: "I", tahap: "Tahap MDU MDK (Materi Dasar Umum / Materi Dasar Khusus)", modul: "Filsafat ilmu dan etika profesi; metodologi penelitian; biostatistik; quality & safety; epidemiologi klinik dan evidence-based medicine; biologi molekuler bedah; farmakologi klinik bedah; ilmu dan keterampilan bedah dasar" },
  { id: "2", r: "II", tahap: "Tahap BTKV Dasar", modul: "Pengenalan bedah jantung pediatrik; pengenalan bedah jantung dewasa; pengenalan bedah toraks; pengenalan bedah vaskular" },
  { id: "3", r: "III", tahap: "Tahap Bedah Dasar", modul: "Bedah ortopedi; bedah onkologi; bedah plastik; bedah urologi; bedah anak; bedah digestif" },
  { id: "4", r: "IV", tahap: "Tahap BTKV Madya", modul: "Bedah jantung dewasa pratama; bedah jantung dewasa madya (masing-masing dengan modul teknik dan perioperatif)" },
  { id: "5", r: "V", tahap: "Tahap BTKV Madya", modul: "Bedah jantung pediatrik dan kongenital dasar; bedah jantung pediatrik dan kongenital asianotik" },
  { id: "6", r: "VI", tahap: "Tahap BTKV Madya", modul: "Bedah vaskular dasar (vaskular perifer dan trauma vaskular, akses dialisis); bedah toraks dasar (dinding dada, paru, dan trauma)" },
  { id: "7", r: "VII", tahap: "Tahap BTKV Madya", modul: "Bedah jantung dewasa paripurna I; bedah jantung pediatrik dan kongenital sianotik" },
  { id: "8", r: "VIII", tahap: "Tahap BTKV Utama", modul: "Bedah vaskular lanjut (rekonstruksi vaskular dan endovaskular); bedah toraks madya (mediastinum dan diafragma)" },
  { id: "9", r: "IX", tahap: "Tahap BTKV Utama", modul: "Bedah jantung pediatrik obstruktif dan kompleks; bedah jantung dewasa paripurna II" },
  { id: "10", r: "X", tahap: "Tahap BTKV Utama", modul: "Bedah toraks lanjut (jalan napas dan esofagus); mandiri; proposal tesis dan tesis akhir" }
];
(function () {
  var ADULT = ["4", "7", "9"];
  var byCat = { umum: ["2"], hf: ["2"].concat(ADULT), koroner: ADULT, katup: ADULT, aorta: ADULT, kongenital: ["5"], toraks: ["6"], vaskular: ["6"] };
  var byId = {};
  function set(ids, sems) { ids.split(" ").forEach(function (id) { byId[id] = sems; }); }
  set("asd vsd krichenko avsd rastelli cincin-vaskular", ["5"]);
  set("koarktasio", ["5", "9"]);
  set("heath-edwards rachs", ["5", "7", "9"]);
  set("darling tga dorv atresia-trikuspid ebstein pa-vsd mcgoon-nakata shunt", ["7"]);
  set("truncus paliasi-univentrikel", ["7", "9"]);
  set("iaa hlhs", ["9"]);
  set("masaoka who-timoma mgfa mediastinum", ["8"]);
  set("cotton-myer zargar siewert", ["10"]);
  set("jamieson", ADULT);
  set("aaa karotis numano schobinger pe-esc", ["8"]);
  set("syok-atls", ["2", "6"]);
  set("euroscore2", ["2", "4"]);
  set("shields", ["2", "8"]);
  set("tasc btai", ["6", "8"]);
  set("endoleak zona-aorta crawford tbad-risiko", ADULT.concat(["8"]));
  Object.keys(byId).forEach(function (id) { if (!DATA.some(function (d) { return d.id === id; })) throw new Error("SEM id tidak dikenal: " + id); });
  DATA.forEach(function (d) { d.sems = byId[d.id] || byCat[d.c]; });
})();

/* ───────────── BAGAN & KALKULATOR INTERAKTIF ─────────────
   extent: batang luas segmen aorta  [label, [mulai, akhir] terkena, [mulai, akhir] dapat meluas]
   scale : skala ambang              [nama, rentang, batas atas inklusif | null]
   quad  : kuadran 2×2 (Forrester)
   calc  : kalkulator skor           [komponen, [[pilihan, poin], ...]]; bands: [[batas atas, tafsir], ...] */
const AORTA = ["Asendens", "Arkus", "Desendens torakal", "Abdominal viseral", "Infrarenal"];
const YN = function (p) { return [["Tidak", 0], ["Ya", p]]; };
const VIZ = {
  "stanford": { t: "extent", segs: AORTA, rows: [["A", [0, 1], [1, 5]], ["B", [2, 3], [3, 5]], ["Non-A non-B", [1, 2], [2, 5]]] },
  "debakey": { t: "extent", segs: AORTA, rows: [["I", [0, 2], [2, 5]], ["II", [0, 1]], ["IIIa", [2, 3]], ["IIIb", [2, 4], [4, 5]]] },
  "crawford": { t: "extent", segs: AORTA, rows: [["I", [2, 3.7]], ["II", [2, 5]], ["III", [2.5, 5]], ["IV", [3, 5]], ["V", [2.5, 3.7]]] },
  "abi": { t: "scale", unit: "ABI", segs: [["Berat", "≤0,40", 0.40], ["Ringan–sedang", "0,41–0,90", 0.90], ["Ambang", "0,91–0,99", 0.999], ["Normal", "1,00–1,40", 1.40], ["Tak terkompresi", ">1,40", null]] },
  "hipotermia": { t: "scale", unit: "°C", segs: [["Sangat dalam", "≤14", 14], ["Dalam", "14,1–20", 20], ["Sedang", "20,1–28", 28], ["Ringan", "28,1–34", 34], ["Di atas rentang", ">34", null]] },
  "syntax": { t: "scale", unit: "skor", segs: [["Rendah", "≤22", 22], ["Sedang", "23–32", 32], ["Tinggi", "≥33", null]] },
  "lvef": { t: "scale", unit: "LVEF %", segs: [["HFrEF", "≤40%", 40], ["HFmrEF", "41–49%", 49.999], ["HFpEF", "≥50%", null]] },
  "efusi-perikard": { t: "scale", unit: "mm", segs: [["Ringan", "<10", 9.999], ["Sedang", "10–20", 20], ["Berat", ">20", null]] },
  "forrester": { t: "quad", x: ["PCWP <18", "PCWP >18"], y: ["CI >2,2", "CI <2,2"], cells: [["I", "Normal"], ["II", "Kongesti paru"], ["III", "Hipoperfusi"], ["IV", "Syok kardiogenik"]] },
  "chads-vasc": { t: "calc", max: 9, items: [["Gagal jantung", YN(1)], ["Hipertensi", YN(1)], ["Usia", [["<65 tahun", 0], ["65–74 tahun", 1], ["≥75 tahun", 2]]], ["Diabetes melitus", YN(1)], ["Stroke / TIA / tromboemboli", YN(2)], ["Penyakit vaskular", YN(1)], ["Jenis kelamin", [["Laki-laki", 0], ["Perempuan", 1]]]], bands: [] },
  "has-bled": { t: "calc", max: 9, items: [["Hipertensi tak terkontrol", YN(1)], ["Fungsi ginjal abnormal", YN(1)], ["Fungsi hati abnormal", YN(1)], ["Stroke", YN(1)], ["Riwayat / predisposisi perdarahan", YN(1)], ["INR labil", YN(1)], ["Usia >65 tahun", YN(1)], ["Antiplatelet / OAINS", YN(1)], ["Alkohol", YN(1)]], bands: [[2, "bukan risiko tinggi"], [9, "risiko perdarahan tinggi (≥3)"]] },
  "rapid": { t: "calc", max: 7, items: [["Ureum", [["<5 mmol/L", 0], ["5–8 mmol/L", 1], [">8 mmol/L", 2]]], ["Usia", [["<50 tahun", 0], ["50–70 tahun", 1], [">70 tahun", 2]]], ["Cairan pleura", [["Purulen", 0], ["Tidak purulen", 1]]], ["Sumber infeksi", [["Komunitas", 0], ["Rumah sakit", 1]]], ["Albumin", [["≥27 g/L", 0], ["<27 g/L", 1]]]], bands: [[2, "risiko rendah"], [4, "risiko sedang"], [7, "risiko tinggi"]] },
  "syok-atls": { t: "scale", unit: "% volume darah hilang", segs: [["Kelas I", "<15%", 14.999], ["Kelas II", "15–30%", 30], ["Kelas III", "30–40%", 40], ["Kelas IV", ">40%", null]] },
  "wells-dvt": { t: "calc", max: 9, items: [["Kanker aktif", YN(1)], ["Paralisis/paresis/gips", YN(1)], ["Tirah baring ≥3 hari / operasi ≤12 minggu", YN(1)], ["Nyeri tekan vena dalam", YN(1)], ["Seluruh tungkai bengkak", YN(1)], ["Betis bengkak ≥3 cm", YN(1)], ["Edema pitting tungkai bergejala", YN(1)], ["Vena kolateral superfisial", YN(1)], ["Riwayat DVT", YN(1)], ["Diagnosis lain sama/lebih mungkin", [["Tidak", 0], ["Ya", -2]]]], bands: [[1, "DVT unlikely (≤1): periksa D-dimer"], [9, "DVT likely (≥2): USG dupleks"]] },
  "shields": { t: "fig", cap: "Skema orisinal, potongan sagital, tidak berskala.", svg: '<svg viewBox="0 0 340 190" width="100%" role="img" aria-label="Skema tiga zona mediastinum menurut Shields"><rect x="8" y="20" width="16" height="150" rx="5" style="fill:var(--muted)"/><text x="4" y="183" text-anchor="start" style="fill:var(--muted);font-size:10px">sternum</text><rect x="26" y="20" width="62" height="150" rx="6" style="fill:var(--accent-soft);stroke:var(--accent)"/><rect x="92" y="20" width="168" height="150" rx="6" style="fill:var(--panel2);stroke:var(--line)"/><ellipse cx="150" cy="118" rx="44" ry="36" style="fill:var(--accent);opacity:.35"/><text x="150" y="122" text-anchor="middle" style="fill:var(--text);font-size:10px">jantung</text><rect x="205" y="24" width="14" height="88" rx="6" style="fill:var(--muted);opacity:.5"/><text x="212" y="20" text-anchor="middle" style="fill:var(--muted);font-size:9px">trakea</text><rect x="236" y="34" width="10" height="128" rx="5" style="fill:var(--muted);opacity:.35"/><rect x="264" y="20" width="38" height="150" rx="6" style="fill:var(--ok-soft);stroke:var(--ok)"/><g style="fill:var(--muted)"><rect x="306" y="22" width="26" height="22" rx="3"/><rect x="306" y="48" width="26" height="22" rx="3"/><rect x="306" y="74" width="26" height="22" rx="3"/><rect x="306" y="100" width="26" height="22" rx="3"/><rect x="306" y="126" width="26" height="22" rx="3"/></g><text x="319" y="183" text-anchor="middle" style="fill:var(--muted);font-size:10px">vertebra</text><text x="57" y="14" text-anchor="middle" style="fill:var(--accent);font-size:11px;font-weight:700">Anterior</text><text x="176" y="14" text-anchor="middle" style="fill:var(--text);font-size:11px;font-weight:700">Viseral</text><text x="283" y="14" text-anchor="middle" style="fill:var(--ok);font-size:11px;font-weight:700">Paravertebral</text><text x="241" y="176" text-anchor="middle" style="fill:var(--muted);font-size:9px">esofagus</text></svg>' },
  "wilkins": { t: "calc", max: 16, items: ["Mobilitas daun", "Penebalan daun", "Kalsifikasi", "Penebalan subvalvular"].map(function (n) { return [n, [["1", 1], ["2", 2], ["3", 3], ["4", 4]]]; }), bands: [[8, "anatomi baik untuk valvuloplasti balon (≤8)"], [16, "anatomi kurang baik untuk valvuloplasti balon (>8)"]] }
};
DATA.forEach(function (d) { d.viz = VIZ[d.id] || null; if (d.viz) d.k += " interaktif bagan diagram " + (d.viz.t === "calc" ? "kalkulator" : "skala"); });
Object.keys(VIZ).forEach(function (id) { if (!DATA.some(function (d) { return d.id === id; })) throw new Error("VIZ id tidak dikenal: " + id); });

/* ───────────── MATERI PER SEMESTER ─────────────
   mod   : [nama modul, kelompok, SKS] — Buku Kurikulum PPDS-1 BTKV FKUI 2022 (bab 5 dan Tabel 6).
   pokok : [pokok bahasan, [id klasifikasi terkait]] — disusun sebagai panduan belajar, BUKAN isi buku kurikulum.
   baca  : rujukan halaman Buku Sakti Tes CPPDS Bedah Toraks dan Kardiovaskular (2024), dari daftar isinya. */
const BUKU = "Buku Sakti Tes CPPDS Bedah Toraks dan Kardiovaskular (2024)";
const TRIO = function (n, t, p) { return [[n, "MKK-2", 2], [t, "MPK", 4], [p, "MKK-2", 3]]; };
const MATERI = {
  "1": { mod: [["Filsafat Ilmu Pengetahuan dan Etika Profesi", "MDU", 1], ["Metodologi Penelitian", "MDU", 2], ["Biostatistik dan Komputer Statistik", "MDU", 2], ["Quality & Safety", "MDK", 2], ["Epidemiologi Klinik dan Evidence-Based Medicine", "MDK", 3], ["Biologi Molekuler Bedah", "MKU", 2], ["Farmakologi Klinik Bedah", "MKU", 2], ["Ilmu & Keterampilan Bedah Dasar", "MKU", 6]],
    pokok: [["Desain penelitian, besar sampel, dan uji statistik dasar", []], ["Telaah kritis jurnal dan tingkat bukti", []], ["Keselamatan pasien bedah dan daftar tilik operasi", []], ["Penilaian pra-anestesi dan status fisik", ["asa"]], ["Infeksi daerah operasi dan profilaksis antibiotik", ["cdc-ssi"]], ["Pelaporan komplikasi pascabedah", ["clavien"]]], baca: [] },
  "2": { mod: [["Pengenalan Bedah Jantung Pediatrik", "MPA-1", 2], ["Pengenalan Bedah Jantung Dewasa", "MPA-1", 2], ["Pengenalan Bedah Toraks", "MPA-1", 4], ["Pengenalan Bedah Vaskular", "MPA-1", 4]],
    pokok: [["Anatomi dinding dada, pleura, paru, dan mediastinum", ["shields", "mediastinum", "stasiun-kgb"]], ["Anatomi jantung, katup, dan arteri koroner", ["dominansi", "segmen-mitral"]], ["Fisiologi kardiovaskular dan hemodinamik", ["forrester", "lvef", "nyha"]], ["Trauma toraks dan syok (ATLS)", ["trauma-toraks", "syok-atls", "hemotoraks"]], ["Pemasangan WSD dan penanganan pneumotoraks", ["pneumotoraks"]], ["Stratifikasi risiko bedah jantung", ["sts-risk", "euroscore2", "asa"]], ["Pemeriksaan vaskular dasar: pulsasi dan ABI", ["abi", "fontaine"]], ["Prinsip mesin pintas jantung-paru, hipotermia, dan proteksi miokard", ["hipotermia"]]],
    baca: [["Anatomi toraks, paru, dan jantung", "1–24"], ["Fisiologi sistem kardiovaskular", "25–36"], ["ATLS dan ACLS", "37–55"], ["Tindakan: WSD, torakotomi, VATS, sternotomi", "61–73"], ["Sistem stratifikasi risiko bedah jantung", "74–92"]] },
  "3": { mod: [["Bedah Ortopedi", "MKK-1", 2], ["Bedah Onkologi", "MKK-1", 2], ["Bedah Plastik", "MKK-1", 2], ["Bedah Urologi", "MKK-1", 2], ["Bedah Anak", "MKK-1", 2], ["Bedah Digestif", "MKK-1", 2]],
    pokok: [["Penanganan awal trauma multipel", ["syok-atls", "trauma-toraks"]], ["Prinsip onkologi bedah dan staging", ["tnm-t", "tnm-nm"]], ["Penyembuhan luka, flap, dan penutupan defek (relevan untuk luka sternum)", ["el-oakley", "pairolero"]], ["Bedah anak dasar: cairan, nutrisi, dan akses vaskular", []]], baca: [] },
  "4": { mod: TRIO("Bedah Jantung Dewasa Pratama", "Teknik Jantung Dewasa Pratama", "Perioperatif Jantung Dewasa Pratama").concat(TRIO("Bedah Jantung Dewasa Madya", "Teknik Jantung Dewasa Madya", "Perioperatif Jantung Dewasa Madya")),
    pokok: [["Penyakit jantung koroner dan indikasi CABG", ["ccs", "syntax", "lesi-acc", "cad-rads", "timi"]], ["Konduit dan patensi graft", ["fitzgibbon", "dominansi"]], ["Stenosis dan regurgitasi aorta", ["as-derajat", "as-stadium", "ar-derajat"]], ["Penyakit katup mitral", ["ms-derajat", "wilkins", "mr-derajat", "carpentier"]], ["Penilaian risiko operasi", ["sts-risk", "euroscore2"]], ["Perawatan pascaoperasi: curah jantung rendah dan inotropik", ["forrester", "vis", "killip"]], ["Komplikasi: perdarahan, AKI, AF, tamponade", ["udpb", "barc", "kdigo-aki", "af-tipe", "chads-vasc", "efusi-perikard"]]],
    baca: [["Tindakan: sternotomi median, indikasi bedah jantung terbuka", "61–73"], ["Sistem stratifikasi risiko bedah jantung", "74–92"]] },
  "5": { mod: TRIO("Bedah Jantung Pediatrik dan Kongenital Dasar", "Teknik Dasar Jantung Pediatrik dan Kongenital Dasar", "Perioperatif Bedah Jantung Pediatrik dan Kongenital Dasar").concat(TRIO("Bedah Jantung Pediatrik dan Kongenital Asianotik", "Teknik Dasar Jantung Pediatrik dan Kongenital Asianotik", "Perioperatif Jantung Pediatrik dan Kongenital Asianotik")),
    pokok: [["Pendekatan segmental dan fisiologi pirau kiri-ke-kanan", []], ["Defek septum atrium dan ventrikel", ["asd", "vsd"]], ["Duktus arteriosus paten", ["krichenko"]], ["Defek septum atrioventrikular", ["avsd", "rastelli"]], ["Koarktasio aorta dan cincin vaskular", ["koarktasio", "cincin-vaskular"]], ["Hipertensi pulmonal dan operabilitas", ["heath-edwards", "ph-grup"]], ["Stratifikasi risiko operasi kongenital", ["rachs"]]], baca: [] },
  "6": { mod: TRIO("Bedah Vaskular Perifer dan Trauma Vaskular", "Teknik Vaskular Dasar dan Akses Dialisis", "Perioperatif Vaskular Dasar").concat(TRIO("Bedah Dinding Dada, Paru dan Trauma", "Teknik Bedah Toraks Dasar", "Perioperatif Toraks Dasar")),
    pokok: [["Penyakit arteri perifer kronik", ["fontaine", "rutherford-kronik", "abi", "tasc", "wifi"]], ["Iskemia tungkai akut", ["rutherford-akut"]], ["Trauma vaskular", ["trauma-vaskular"]], ["Akses hemodialisis", ["avf", "haidi"]], ["Penyakit vena dan limfe", ["ceap", "wells-dvt", "isl"]], ["Deformitas dinding dada", ["haller"]], ["Pneumotoraks, efusi, dan empiema", ["pneumotoraks", "vanderschueren", "light", "empiema", "rapid"]], ["Trauma toraks", ["trauma-toraks", "hemotoraks", "syok-atls"]], ["Kanker paru: staging dan kelayakan reseksi", ["tnm-t", "tnm-nm", "stasiun-kgb", "fungsi-paru"]]],
    baca: [["Patologi: abses paru, empiema, TB paru, tumor paru", "56–60"], ["Tindakan: WSD, torakotomi, VATS, reseksi paru", "61–73"], ["ATLS (trauma toraks)", "37–47"]] },
  "7": { mod: TRIO("Bedah Jantung Dewasa Paripurna I", "Teknik Bedah Jantung Dewasa Paripurna I", "Perioperatif Jantung Dewasa Paripurna I").concat(TRIO("Bedah Jantung Pediatrik dan Kongenital Sianotik", "Teknik Jantung Pediatrik dan Kongenital Sianotik", "Perioperatif Jantung Pediatrik dan Kongenital Sianotik")),
    pokok: [["Repair katup mitral", ["carpentier", "degeneratif-mitral", "segmen-mitral"]], ["Endokarditis infektif", ["duke"]], ["Diseksi dan aneurisma aorta proksimal", ["stanford", "debakey", "ambang-aorta", "zona-aorta", "hipotermia"]], ["Tetralogi Fallot dan atresia pulmonal", ["mcgoon-nakata", "pa-vsd", "shunt"]], ["Transposisi dan DORV", ["tga", "dorv"]], ["Lesi sianotik lain", ["truncus", "darling", "atresia-trikuspid", "ebstein"]], ["Paliasi univentrikel menuju Fontan", ["paliasi-univentrikel"]]], baca: [] },
  "8": { mod: TRIO("Bedah Rekonstruksi Vaskular dan Endovaskular", "Teknik Vaskular Lanjut dan Endovaskular", "Perioperatif Vaskular Lanjut").concat(TRIO("Bedah Mediastinum dan Diafragma", "Teknik Bedah Toraks Madya", "Perioperatif Toraks Madya")),
    pokok: [["Aneurisma aorta abdominal dan EVAR", ["aaa", "endoleak"]], ["Aorta torakoabdominal dan TEVAR", ["crawford", "zona-aorta", "tbad-risiko", "btai"]], ["Penyakit karotis", ["karotis"]], ["Vaskulitis dan anomali vaskular", ["numano", "schobinger"]], ["Emboli paru", ["pe-esc"]], ["Kompartemen dan massa mediastinum", ["shields", "mediastinum"]], ["Timoma dan miastenia gravis", ["masaoka", "who-timoma", "mgfa"]]],
    baca: [["Patologi: tumor mediastinum", "56–60"]] },
  "9": { mod: [["Bedah Jantung Pediatrik Obstruktif", "MKK-2", 2], ["Bedah Jantung Pediatrik Kompleks", "MKK-2", 4], ["Perioperatif Jantung Pediatrik Kompleks", "MKK-2", 3]].concat(TRIO("Bedah Jantung Dewasa Paripurna II", "Teknik Bedah Jantung Dewasa Paripurna II", "Perioperatif Bedah Jantung Dewasa Paripurna II")),
    pokok: [["Lesi obstruktif kiri dan arkus", ["koarktasio", "iaa", "hlhs"]], ["Paliasi kompleks dan Norwood", ["paliasi-univentrikel", "truncus"]], ["Sindrom aorta akut lanjut dan malperfusi", ["svensson", "tem", "penn", "malperfusi"]], ["Repair katup aorta dan katup bikuspid", ["el-khoury", "sievers"]], ["Gagal jantung lanjut, ECMO, dan alat bantu sirkulasi", ["scai", "intermacs", "ecmo"]], ["Transplantasi jantung", ["ishlt"]], ["Endarterektomi pulmonal", ["jamieson"]]], baca: [] },
  "10": { mod: TRIO("Bedah Jalan Nafas dan Esofagus", "Teknik Bedah Toraks Lanjut", "Perioperatif Toraks Lanjut").concat([["Mandiri", "MPK", 3], ["Proposal Tesis", "MPA-2", 3], ["Tesis Akhir", "MPA-2", 4]]),
    pokok: [["Stenosis trakea dan rekonstruksi jalan napas", ["cotton-myer"]], ["Cedera kaustik esofagus", ["zargar"]], ["Karsinoma esofagus dan esophagogastric junction", ["siewert"]], ["Penyusunan proposal dan tesis", []]],
    baca: [["Bank soal sesi 1–16, esai, OSCE, telaah jurnal", "93 dst."]] }
};
(function () {
  Object.keys(MATERI).forEach(function (k) { MATERI[k].pokok.forEach(function (p) { p[1].forEach(function (id) { if (!DATA.some(function (d) { return d.id === id; })) throw new Error("MATERI id tidak dikenal: " + id); }); }); });
})();
