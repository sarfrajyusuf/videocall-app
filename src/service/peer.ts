class PeerService {
  peer: RTCPeerConnection | null;

  constructor() {
    this.peer = null;

    if (!this.peer) {
      this.peer = new RTCPeerConnection({
        iceServers: [
          {
            urls: [
              "stun:stun.l.google.com:19302",
              "stun:global.stun.twilio.com:3478",
            ],
          },
        ],
      });
    }
  }
  async setLocalDescription(ans: any) {
    if (this.peer) {
      await this.peer.setRemoteDescription(new RTCSessionDescription(ans));
    } else {
      console.error("Peer is null. Unable to set remote description.");
    }
  }

  async getAnswer(offer: any) {
    if (this.peer) {
      await this.peer.setRemoteDescription(offer);
      const ans = await this.peer.createAnswer();
      await this.peer.setLocalDescription(new RTCSessionDescription(ans));
      return ans;
    }
  }

  async getOffer() {
    if (this.peer) {
      const offer = await this.peer.createOffer();
      await this.peer.setLocalDescription(new RTCSessionDescription(offer));
      // Additional logic with the offer
      return offer;
    }
  }
}

const peerService = new PeerService();
export default peerService;
