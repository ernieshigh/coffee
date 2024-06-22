const API = {
  //url: "https://firtman.github.io/coffeemasters/api/menu.json",
  url: "../coffee/data/menu.json",
  fetchMenu: async () => {
    const result = await fetch(API.url);
    return await result.json();
  },
};

export default API;
