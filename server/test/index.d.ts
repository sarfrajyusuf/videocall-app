import { expect } from "chai";
import { io, socketidToEmailMap, emailToSocketMap } from "../app"; // Replace with the actual path to your socket file

describe("Socket.IO Server Tests", () => {
  let socket;

  before(() => {
    // Connect a test socket before running the tests
    socket = require("socket.io-client")("http://localhost:8000");
  });

  after(() => {
    // Disconnect the test socket after running the tests
    socket.disconnect();
  });

  it("should join a room and emit events", (done) => {
    const testData = { email: "test@example.com", room: "test-room" };

    socket.emit("room:join", testData);

    // Assuming the server responds with 'room:join' event
    socket.on("room:join", (data) => {
      expect(data).to.deep.equal(testData);
      done();
    });
  });

  it("should handle user call and emit incoming call event", (done) => {
    const testData = { to: "recipient-id", offer: "test-offer" };

    socket.emit("user:call", testData);

    // Assuming the server responds with 'incoming:call' event
    socket.on("incoming:call", (data) => {
      expect(data).to.deep.equal({ from: socket.id, offer: testData.offer });
      done();
    });
  });

  it("should handle accepted call and emit accepted call event", (done) => {
    const testData = { to: "caller-id", ans: "test-answer" };

    socket.emit("accepted:call", testData);

    // Assuming the server responds with 'accepted:call' event
    socket.on("accepted:call", (data) => {
      expect(data).to.deep.equal({ from: socket.id, ans: testData.ans });
      done();
    });
  });

  it("should handle peer negotiation needed and emit peer negotiation needed event", (done) => {
    const testData = { to: "recipient-id", offer: "test-offer" };

    socket.emit("peer:nego:needed", testData);

    // Assuming the server responds with 'peer:nego:needed' event
    socket.on("peer:nego:needed", (data) => {
      expect(data).to.deep.equal({ from: socket.id, offer: testData.offer });
      done();
    });
  });

  it("should handle peer negotiation done and emit peer negotiation final event", (done) => {
    const testData = { to: "recipient-id", ans: "test-answer" };

    socket.emit("peer:nego:done", testData);

    // Assuming the server responds with 'peer:nego:final' event
    socket.on("peer:nego:final", (data) => {
      expect(data).to.deep.equal({ from: socket.id, ans: testData.ans });
      done();
    });
  });

  // Add similar tests for other functions

  // ...
});
