export function useChatbot() {
    function sendMessage(msg: string) {
      console.log("Sending:", msg);
    }
  
    return { sendMessage };
  }
  