import { subscribeHtml } from "./subscribeHtml.js";

export default {
  navbar: {
    name: "Navbar",
    content: [
      {
        name: "Title",
        types: ["text"],
        text: "My Restaurant",
        style: {
          color: "#ffffff",
          fontFamily: "Arial",
          fontSize: "22px",
          fontWeight: 600
        }
      },
      {
        name: "Navigation",
        types: ["text", "ro-text"],
        style: {
          color: "#ffffff",
          fontFamily: "Arial",
          fontSize: "15px",
          fontWeight: 500
        }
      },
      {
        name: "Bar",
        types: ["bar"],
        style: {
          backgroundColor: "#1a1a1a",
          height: "55px"
        }
      }
    ]
  },
  pages: [
    {
      name: "Home",
      backgroundColor: "#ffffff",
      components: [
        {
          name: "Greeting",
          html: '<div class="container"><div class="greeting">§greeting§</div><div class="message">§message§</div></div>',
          content: [
            {
              name: "Container",
              types: ["container"],
              id: "container",
              hidden: false,
              style: {
                backgroundColor: "#f5f5f5",
                height: "280px",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                gap: "20px",
                padding: "40px",
                borderRadius: "0px"
              }
            },
            {
              name: "Greeting",
              types: ["text"],
              id: "greeting",
              hidden: false,
              text: "Welcome",
              style: {
                color: "#111111",
                fontSize: "50px",
                fontWeight: 700,
                fontFamily: "Arial"
              }
            },
            {
              name: "Message",
              types: ["text"],
              id: "message",
              hidden: false,
              text: "Great food, great people.",
              style: {
                color: "#666666",
                fontSize: "18px",
                fontWeight: 400,
                fontFamily: "Arial"
              }
            }
          ]
        },
        {
          name: "Subscribe Form",
          html: subscribeHtml,
          content: [
            {
              name: "Container",
              types: ["container"],
              id: "subscribe-container",
              hidden: false,
              style: {
                backgroundColor: "#ffffff",
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
                backgroundColor: "#1a1a1a",
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
        },
        {
          name: "Right Side",
          html: '<div class="container"><div class="message">§message§</div><a class="redirect-button" href="/write-review/§projectId§">§redirect-button§</a></div>',
          content: [
            {
              name: "Container",
              types: ["container"],
              id: "container",
              hidden: false,
              style: {
                backgroundColor: "#eeeeee",
                height: "180px",
                width: "100%",
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "row",
                gap: "0px",
                padding: "50px",
                borderRadius: "0px"
              }
            },
            {
              name: "Message",
              types: ["text"],
              id: "message",
              hidden: false,
              text: "Loved it? Tell others.",
              style: {
                color: "#111111",
                fontSize: "26px",
                fontWeight: 500,
                fontFamily: "Arial"
              }
            },
            {
              name: "Redirect Button",
              types: ["container", "text"],
              id: "redirect-button",
              hidden: false,
              text: "Write a Review",
              style: {
                color: "#ffffff",
                fontSize: "15px",
                fontWeight: 600,
                fontFamily: "Arial",
                backgroundColor: "#1a1a1a",
                height: "50px",
                width: "140px",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                gap: "0px",
                padding: "0px",
                borderRadius: "6px"
              }
            }
          ]
        }
      ]
    }
  ]
};
