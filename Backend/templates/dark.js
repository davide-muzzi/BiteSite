export default {
  navbar: {
    name: "Navbar",
    content: [
      {
        name: "Title",
        types: ["text"],
        text: "My Restaurant",
        style: {
          color: "#d4a843",
          fontFamily: "Arial",
          fontSize: "22px",
          fontWeight: 600
        }
      },
      {
        name: "Navigation",
        types: ["text", "ro-text"],
        style: {
          color: "#d4a843",
          fontFamily: "Arial",
          fontSize: "15px",
          fontWeight: 500
        }
      },
      {
        name: "Bar",
        types: ["bar"],
        style: {
          backgroundColor: "#111111",
          height: "55px"
        }
      }
    ]
  },
  pages: [
    {
      name: "Home",
      backgroundColor: "#1a1a1a",
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
                backgroundColor: "#222222",
                height: "300px",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                gap: "20px",
                padding: "50px",
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
                color: "#d4a843",
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
              text: "Experience the night.",
              style: {
                color: "#bbbbbb",
                fontSize: "18px",
                fontWeight: 400,
                fontFamily: "Arial"
              }
            }
          ]
        },
        {
          name: "Reservation Form",
          html: '<div class="form-container"><div class="form-heading">§form-heading§</div><div class="fields-container"><input class="name-input" type="text" placeholder="§name-input§"><input class="email-input" type="email" placeholder="§email-input§"><button class="submit-button">§submit-button§</button></div></div>',
          content: [
            {
              name: "Container",
              types: ["container"],
              id: "form-container",
              hidden: false,
              style: {
                backgroundColor: "#1a1a1a",
                height: "auto",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                gap: "30px",
                padding: "50px",
                borderRadius: "0px"
              }
            },
            {
              name: "Heading",
              types: ["text"],
              id: "form-heading",
              hidden: false,
              text: "Book Your Night",
              style: {
                color: "#d4a843",
                fontSize: "30px",
                fontWeight: 700,
                fontFamily: "Arial"
              }
            },
            {
              name: "Fields Container",
              types: ["container"],
              id: "fields-container",
              hidden: false,
              style: {
                backgroundColor: "transparent",
                height: "auto",
                width: "100%",
                justifyContent: "center",
                alignItems: "flex-start",
                flexDirection: "column",
                gap: "15px",
                padding: "0px",
                borderRadius: "0px"
              }
            },
            {
              name: "Name Field",
              types: ["input"],
              id: "name-input",
              hidden: false,
              text: "Your name",
              style: {
                width: "300px",
                height: "45px",
                backgroundColor: "#2a2a2a",
                color: "#eeeeee",
                fontSize: "16px",
                borderRadius: "6px",
                padding: "0px 14px",
                border: "1px solid #444444",
                outline: "none",
                boxSizing: "border-box"
              }
            },
            {
              name: "Email Field",
              types: ["input"],
              id: "email-input",
              hidden: false,
              text: "Your email address",
              style: {
                width: "300px",
                height: "45px",
                backgroundColor: "#2a2a2a",
                color: "#eeeeee",
                fontSize: "16px",
                borderRadius: "6px",
                padding: "0px 14px",
                border: "1px solid #444444",
                outline: "none",
                boxSizing: "border-box"
              }
            },
            {
              name: "Submit Button",
              types: ["container", "text"],
              id: "submit-button",
              hidden: false,
              text: "Book Now",
              style: {
                color: "#111111",
                fontSize: "16px",
                fontWeight: 700,
                fontFamily: "Arial",
                backgroundColor: "#d4a843",
                height: "45px",
                width: "300px",
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
