"use client";
export const dynamic = 'force-dynamic';
import { useState, useEffect } from "react";
import Link from "next/link";

interface Product { id: string; name: string; price: number; category: string; description: string; image: string; stock: number; }

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [added, setAdded] = useState<string | null>(null);

  useEffect(() => {
    setProducts([
      { id:"1", name:"AI Prompt Engineering Course", price:5000, category:"Courses", description:"Master AI prompts and earn $500-1000/month", image:"🤖", stock:999 },
      { id:"2", name:"Data Annotation Mastery", price:5000, category:"Courses", description:"Professional data labeling for AI companies", image:"📊", stock:999 },
      { id:"3", name:"Virtual Sales Elite Program", price:5000, category:"Courses", description:"High-ticket remote sales techniques", image:"💼", stock:999 },
      { id:"4", name:"JobLink 360 Premium Membership", price:2500, category:"Membership", description:"90-day job placement guarantee", image:"⭐", stock:999 },
      { id:"5", name:"Business Plan Template Bundle", price:1500, category:"Templates", description:"10 investor-ready business plan templates", image:"📋", stock:999 },
      { id:"6", name:"Grant Writing Masterclass", price:3500, category:"Courses", description:"Win funding across 26 African countries", image:"🏆", stock:999 },
      { id:"7", name:"ERP Setup Consultation", price:15000, category:"Services", description:"1-hour Titanium ERP onboarding session", image:"⚙️", stock:50 },
      { id:"8", name:"Pan-African Trade AI Course", price:5000, category:"Courses", description:"AI tools for cross-border trade", image:"🌍", stock:999 },
    ]);
    setLoading(false);
  }, []);

  const addToCart = (id: string, name: string) => {
    setCart([...cart, id]);
    setAdded(name);
    setTimeout(() => setAdded(null), 2000);
  };

  const filtered = products.filter(p =>
    (category === "all" || p.category === category) &&
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const categories = ["all", ...Array.from(new Set(products.map(p => p.category)))];

  return (
    <div style={{ minHeight:"100vh", background:"#000", color:"#fff", fontFamily:"system-ui" }}>
      <nav style={{ borderBottom:"1px solid #333", padding:"1rem 2rem", display:"flex", justifyContent:"space-between", alignItems:"center", position:"sticky", top:0, background:"#000", zIndex:100 }}>
        <h1 style={{ color:"#f59e0b", margin:0 }}>🛒 JobLink 360 Shop</h1>
        <div style={{ display:"flex", gap:"1rem", alignItems:"center" }}>
          <Link href="/" style={{ color:"#9ca3af", textDecoration:"none" }}>Home</Link>
          <Link href="/shop/checkout" style={{ background:"#f59e0b", color:"#000", padding:"0.5rem 1rem", borderRadius:"0.5rem", textDecoration:"none", fontWeight:"bold" }}>
            🛒 Cart ({cart.length})
          </Link>
        </div>
      </nav>

      {added && (
        <div style={{ position:"fixed", top:"80px", right:"20px", background:"#10b981", color:"#000", padding:"1rem 1.5rem", borderRadius:"0.5rem", fontWeight:"bold", zIndex:200 }}>
          ✅ {added} added to cart!
        </div>
      )}

      <div style={{ maxWidth:"1200px", margin:"0 auto", padding:"2rem" }}>
        <div style={{ display:"flex", gap:"1rem", marginBottom:"2rem", flexWrap:"wrap" }}>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products..." style={{ flex:1, minWidth:"200px", padding:"0.75rem", background:"#111", border:"1px solid #333", borderRadius:"0.5rem", color:"#fff" }} />
          <div style={{ display:"flex", gap:"0.5rem", flexWrap:"wrap" }}>
            {categories.map(c => (
              <button key={c} onClick={() => setCategory(c)} style={{ padding:"0.5rem 1rem", background: category === c ? "#f59e0b" : "#111", color: category === c ? "#000" : "#fff", border:"1px solid #333", borderRadius:"0.5rem", cursor:"pointer", fontWeight: category === c ? "bold" : "normal" }}>
                {c === "all" ? "All" : c}
              </button>
            ))}
          </div>
        </div>

        {loading ? <p style={{ color:"#9ca3af", textAlign:"center" }}>Loading products...</p> : (
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(280px, 1fr))", gap:"1.5rem" }}>
            {filtered.map(p => (
              <div key={p.id} style={{ background:"#111", border:"1px solid #222", borderRadius:"1rem", padding:"1.5rem", display:"flex", flexDirection:"column" }}>
                <div style={{ fontSize:"3rem", marginBottom:"1rem", textAlign:"center" }}>{p.image}</div>
                <span style={{ background:"rgba(245,158,11,0.2)", color:"#f59e0b", padding:"0.25rem 0.75rem", borderRadius:"2rem", fontSize:"0.75rem", alignSelf:"flex-start", marginBottom:"0.75rem" }}>{p.category}</span>
                <h3 style={{ color:"#fff", margin:"0 0 0.5rem", fontSize:"1rem" }}>{p.name}</h3>
                <p style={{ color:"#9ca3af", fontSize:"0.875rem", margin:"0 0 1rem", flex:1 }}>{p.description}</p>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <span style={{ color:"#f59e0b", fontWeight:"bold", fontSize:"1.25rem" }}>KES {p.price.toLocaleString()}</span>
                  <button onClick={() => addToCart(p.id, p.name)} style={{ background:"#f59e0b", color:"#000", padding:"0.5rem 1rem", borderRadius:"0.5rem", border:"none", fontWeight:"bold", cursor:"pointer" }}>
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        {filtered.length === 0 && !loading && <p style={{ color:"#9ca3af", textAlign:"center", padding:"2rem" }}>No products found.</p>}
      </div>
    </div>
  );
}

