
const ham=document.getElementById('ham'),mob=document.getElementById('mob-nav');
if(ham)ham.addEventListener('click',()=>mob.classList.toggle('open'));
function closeMob(){if(mob)mob.classList.remove('open')}
const io=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('vis')})},{threshold:.1});
document.querySelectorAll('.rev').forEach(el=>io.observe(el));
const f=document.getElementById('ct-form');
if(f){
  const q=new URLSearchParams(location.search).get('type');
  const sel=document.getElementById('ct-type');
  if(q&&sel){[...sel.options].forEach(o=>{if(o.text===q)sel.value=o.value||o.text})}
  f.addEventListener('submit',e=>{e.preventDefault();f.style.display='none';document.getElementById('form-ok').style.display='block';window.scrollTo({top:0,behavior:'smooth'})});
}
