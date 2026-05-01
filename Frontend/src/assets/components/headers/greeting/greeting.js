export default {
  name: "Greeting",
  html: "<div class=\"container\"><div class=\"greeting\">§greeting§</div><div class=\"message\">§message§</div></div>",
  content: [
    {
      name: "Container",
      types: [
        "container"
      ],
      id: "container",
      hidden: false,
      style: {
        backgroundColor: "#1c71d8",
        height: "200px",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "20px",
        padding: "20px",
        borderRadius: "0px"
      }
    },
    {
      name: "Greeting",
      types: [
        "text"
      ],
      id: "greeting",
      hidden: false,
      text: "Greetings, Traveller",
      style: {
        color: "#ffffff",
        fontSize: "45px",
        fontWeight: 700,
        fontFamily: "Times New Roman"
      }
    },
    {
      name: "Message",
      types: [
        "text"
      ],
      id: "message",
      hidden: false,
      text: "Welcome to my  homepage",
      style: {
        color: "#ffffff",
        fontSize: "17px",
        fontWeight: 400,
        fontFamily: "Arial"
      }
    }
  ]
};
