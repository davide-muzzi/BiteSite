export default {
  name: "Right Side",
  html: '<div class="container"><div class="message">§message§</div><a class="redirect-button" href="/write-review/§projectId§">§redirect-button§</a></div>',
  content: [
    {
      name: "Container",
      types: [
        "container"
      ],
      id: "container",
      hidden: false,
      style: {
        backgroundColor: "#dddddd",
        height: "200px",
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
      types: [
        "text"
      ],
      id: "message",
      hidden: false,
      text: "Review this restaurant on BiteSite",
      style: {
        color: "#000000",
        fontSize: "30px",
        fontWeight: 500,
        fontFamily: "Arial"
      }
    },
    {
      name: "Redirect Button",
      types: [
        "container",
        "text"
      ],
      id: "redirect-button",
      hidden: false,
      text: "Review",
      style: {
        color: "#ffffff",
        fontSize: "18px",
        fontWeight: 400,
        fontFamily: "Arial",
        backgroundColor: "#222222",
        height: "50px",
        width: "100px",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        gap: "0px",
        padding: "0px",
        borderRadius: "0px"
      }
    }
  ]
};
