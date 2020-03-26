import IO from "socket.io-client";

function HomePage() {
  const socket = IO("http://localhost:4321");
  socket.on("message", e => console.log(e));
  return <div>Welcome to Next.js</div>;
}
export default HomePage;
