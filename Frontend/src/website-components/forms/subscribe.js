const apiUrl = import.meta.env.VITE_API_URL || '';

const html = [
  '<div class="subscribe-container">',
    '<div class="subscribe-heading">§subscribe-heading§</div>',
    '<div class="subscribe-subtext">§subscribe-subtext§</div>',
    '<div class="subscribe-form-row">',
      '<input class="subscribe-input" type="email" placeholder="§subscribe-input§">',
      '<button class="subscribe-button" onclick="bsSubscribe(this,\'§projectId§\')">§subscribe-button§</button>',
    '</div>',
  '</div>',
  '<script>',
  'if(!window.bsSubscribe){window.bsSubscribe=function(btn,id){',
  'var inp=btn.previousElementSibling;',
  'if(!inp.value||!inp.value.includes(\'@\')){inp.style.outline=\'2px solid red\';return;}',
  'inp.style.outline=\'\';btn.disabled=true;',
  `fetch('${apiUrl}/restaurants/newsletter/subscribe',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email:inp.value,projectId:id})})`,
  '.then(function(r){return r.json();})',
  '.then(function(d){btn.textContent=d.success?\'Subscribed!\':d.message;})',
  '.catch(function(){btn.textContent=\'Try again\';btn.disabled=false;});}}',
  '<\/script>',
].join('');

export default {
  name: "Subscribe Form",
  html,
  content: [
    {
      name: "Container",
      types: ["container"],
      id: "subscribe-container",
      hidden: false,
      style: {
        backgroundColor: "#f5f5f5",
        height: "auto",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "16px",
        padding: "50px",
        borderRadius: "0px"
      }
    },
    {
      name: "Heading",
      types: ["text"],
      id: "subscribe-heading",
      hidden: false,
      text: "Stay in touch",
      style: {
        color: "#111111",
        fontSize: "28px",
        fontWeight: 700,
        fontFamily: "Arial"
      }
    },
    {
      name: "Subtext",
      types: ["text"],
      id: "subscribe-subtext",
      hidden: false,
      text: "Subscribe to get our latest news and offers.",
      style: {
        color: "#777777",
        fontSize: "15px",
        fontWeight: 400,
        fontFamily: "Arial"
      }
    },
    {
      name: "Form Row",
      types: ["container"],
      id: "subscribe-form-row",
      hidden: false,
      style: {
        backgroundColor: "transparent",
        height: "auto",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        gap: "10px",
        padding: "0px",
        borderRadius: "0px"
      }
    },
    {
      name: "Email Input",
      types: ["input"],
      id: "subscribe-input",
      hidden: false,
      text: "Your email address",
      style: {
        width: "280px",
        height: "45px",
        backgroundColor: "#ffffff",
        color: "#333333",
        fontSize: "15px",
        borderRadius: "6px",
        padding: "0px 14px",
        border: "1px solid #cccccc",
        outline: "none",
        boxSizing: "border-box"
      }
    },
    {
      name: "Subscribe Button",
      types: ["container", "text"],
      id: "subscribe-button",
      hidden: false,
      text: "Subscribe",
      style: {
        color: "#ffffff",
        fontSize: "15px",
        fontWeight: 600,
        fontFamily: "Arial",
        backgroundColor: "#222222",
        height: "45px",
        width: "120px",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        gap: "0px",
        padding: "0px",
        borderRadius: "6px"
      }
    }
  ]
};
