export default {
  name: "Reservation Form",
  html: '<div class="form-container"><div class="form-heading">§form-heading§</div><div class="fields-container"><input class="name-input" type="text" placeholder="§name-input§"><input class="email-input" type="email" placeholder="§email-input§"><button class="submit-button">§submit-button§</button></div></div>',
  content: [
    {
      name: "Container",
      types: ["container"],
      id: "form-container",
      hidden: false,
      style: {
        backgroundColor: "#f5f5f5",
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
      text: "Make a Reservation",
      style: {
        color: "#000000",
        fontSize: "32px",
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
        backgroundColor: "#ffffff",
        color: "#333333",
        fontSize: "16px",
        borderRadius: "6px",
        padding: "0px 14px",
        border: "1px solid #cccccc",
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
        border: "1px solid #cccccc",
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
        color: "#ffffff",
        fontSize: "16px",
        fontWeight: 600,
        fontFamily: "Arial",
        backgroundColor: "#222222",
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
};
