chrome.runtime.onMessage.addListener(async (message: { action: string }) => {
  if (message.action === "FETCH_DATA") {
    const data = await (
      await fetch("https://jsonplaceholder.typicode.com/todos/1")
    ).json();
    console.log(data);
  }

  if (message.action === "GET_DATA") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const currentTab = tabs[0]; // Assuming there's only one active tab
      if (currentTab.id) {
        chrome.scripting.executeScript({
          target: { tabId: currentTab.id }, // Specify the target (tab ID in this case)
          func: () => {
            console.log("hi");
            document.getElementById("textarea1");
            chrome.runtime.sendMessage({
              action: "RENDER_DATA",
              data: "Hi, Data here",
            });
          },
        });
      }
    });
  }
});
