import JWT from "./Drivers/JWT";
const Server = {
  test: () => {
    let test = {"a": "hello"};
    let c = JWT.encrypt(test);
    let zz = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiIzMyJ9.jWFHtIB3_n7qaQPurcuYlvF_IutNp_zGH8LDUBySIKc";
    // let b = JWT.verify("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiIzMyJ9.AL_7wBjAXM9djXUTe5I4OX40DSdq-4aG-lNWI-NVsxQ", "33");
    let b = JWT.verify(zz, "33");
    console.log(b);
  }
};
export default Server;
