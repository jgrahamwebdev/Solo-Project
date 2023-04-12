
const Newsletter = ({ status, message, onValidated }) => {
    let email;
    const submit = () =>
      email &&
      email.value.indexOf("@") > -1 &&
      onValidated({
        EMAIL: email.value,
      });

    return (
        <div className="w-[80%] h-[14rem] bg-[#d8d8d8] mb-[2rem] mx-auto flex items-center justify-center flex-col rounded-md">
            <div className="flex items-center justify-center flex-col mb-3">
                <img className="h-[2.5rem] w-auto" src="./img/robot.png" alt="logo"/>
                <h3>Subscribe to our newsletter</h3>
                <h5>Stay up to date with the latest news in tech!</h5>
            </div>

            <div>
                {status === "sending" && <div style={{ color: "#2980b9", fontSize: "1.2rem" }}>Sending...</div>}
                {status === "error" && (
                    <div
                        style={{ color: "red", fontSize: "1.2rem" }}
                        dangerouslySetInnerHTML={{ __html: message }}
                    />
                )}
                {status === "success" && (
                    <div
                        style={{ color: "#27ae60", fontSize: "1.2rem"}}
                        dangerouslySetInnerHTML={{ __html: message }}
                    />
                )}
            </div>
            <div className="flex items-center justify-center w-[70%] h-[3rem]">
                <input
                    className="w-1/2 h-[2.2rem] mr-2 pl-2"
                    ref={node => (email = node)}
                    type="email"
                    placeholder="Your email"
                />

                <button className="bg-[#2ECC40] rounded-md py-2 px-3 text-sm font-[400] text-white shadow-sm hover:bg-[#259a56] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2ECC40]" onClick={submit}>Subscribe</button>
            </div>
        </div>
    )
}

export default Newsletter
