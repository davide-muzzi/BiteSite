export default {
  navbar: {
    name: "Navbar",
    content: [
      {
        name: "Title",
        types: ["text"],
        text: "My Restaurant",
        style: {
          color: "#f5deb3",
          fontFamily: "Times New Roman",
          fontSize: "22px",
          fontWeight: 600
        }
      },
      {
        name: "Navigation",
        types: ["text", "ro-text"],
        style: {
          color: "#f5deb3",
          fontFamily: "Times New Roman",
          fontSize: "15px",
          fontWeight: 500
        }
      },
      {
        name: "Bar",
        types: ["bar"],
        style: {
          backgroundColor: "#6b3a2a",
          height: "55px"
        }
      }
    ]
  },
  pages: [
    {
      name: "Home",
      backgroundColor: "#fdf6ec",
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
                backgroundColor: "#f5e6d0",
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
              text: "Benvenuti",
              style: {
                color: "#5c2d0a",
                fontSize: "50px",
                fontWeight: 700,
                fontFamily: "Times New Roman"
              }
            },
            {
              name: "Message",
              types: ["text"],
              id: "message",
              hidden: false,
              text: "Authentic flavors, made with love.",
              style: {
                color: "#8b5a3a",
                fontSize: "20px",
                fontWeight: 400,
                fontFamily: "Times New Roman"
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
                backgroundColor: "#fdf6ec",
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
              text: "Reserve a Table",
              style: {
                color: "#5c2d0a",
                fontSize: "30px",
                fontWeight: 700,
                fontFamily: "Times New Roman"
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
                backgroundColor: "#ffffff",
                color: "#333333",
                fontSize: "16px",
                borderRadius: "6px",
                padding: "0px 14px",
                border: "1px solid #c4956a",
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
                backgroundColor: "#ffffff",
                color: "#333333",
                fontSize: "16px",
                borderRadius: "6px",
                padding: "0px 14px",
                border: "1px solid #c4956a",
                outline: "none",
                boxSizing: "border-box"
              }
            },
            {
              name: "Submit Button",
              types: ["container", "text"],
              id: "submit-button",
              hidden: false,
              text: "Reserve",
              style: {
                color: "#f5deb3",
                fontSize: "16px",
                fontWeight: 600,
                fontFamily: "Times New Roman",
                backgroundColor: "#6b3a2a",
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
                backgroundColor: "#f5e6d0",
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
              text: "Share your experience.",
              style: {
                color: "#5c2d0a",
                fontSize: "24px",
                fontWeight: 500,
                fontFamily: "Times New Roman"
              }
            },
            {
              name: "Redirect Button",
              types: ["container", "text"],
              id: "redirect-button",
              hidden: false,
              text: "Leave a Review",
              style: {
                color: "#f5deb3",
                fontSize: "15px",
                fontWeight: 600,
                fontFamily: "Times New Roman",
                backgroundColor: "#6b3a2a",
                height: "50px",
                width: "150px",
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
