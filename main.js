document.addEventListener('DOMContentLoaded',()=>{
  const form=document.getElementById('enrollForm');
  if(!form) return;
  form.addEventListener('submit',async(e)=>{
    e.preventDefault();
    const data=Object.fromEntries(new FormData(form).entries());
    const statusEl=document.getElementById('status');
    statusEl.textContent='Submitting...';
    try{
      const res=await fetch('/api/enroll',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});
      const body=await res.json();
      if(res.ok){
        statusEl.textContent='Enrollment submitted — we will contact you soon.';
        form.reset();
      } else {
        statusEl.textContent=body.error||'Submission failed.';
      }
    }catch(err){
      statusEl.textContent='Network error — try again later.';
    }
  });
});
