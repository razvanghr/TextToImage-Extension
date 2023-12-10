const contextMenuItem = {
  id: "imgto",
  title: "Image to translate",
  contexts: ["selection"],
};

chrome.contextMenus.create(contextMenuItem);

chrome.contextMenus.onClicked.addListener(async function (clickData) {
  if (clickData.menuItemId == "imgto" && clickData.selectionText) {
    console.log(await fetchImage(clickData.selectionText));
    console.log(clickData.selectionText);
    chrome.tabs.create(
      { url: await fetchImage(clickData.selectionText) },
      function (tab) {}
    );
  }
});

const fetchImage = async (selectedText) => {
  try {
    const queryParams = new URLSearchParams({
      query: selectedText.toString(),
      page: 1,
      client_id: "wo_k_SGUY3C6vDHntDCmUW25HVpTHNCLxQ1AB9t8iUI",
      per_page: 1,
    });

    const url = `https://api.unsplash.com/search/photos?${queryParams}`;
    const res = await fetch(url);
    const data = await res.json();
    return data.results[0].urls.regular;
  } catch (error) {
    console.error(error);
  }
};
