chrome.management.getAll(function(arr) {
  var itemWrap;
  var titleDom;
  var imgDom;
  var enableDom;
  var itemCName;
  arr.forEach(function(item, index, arr) {
    itemWrap = document.createElement('div');
    if(item.icons && item.icons[0] && item.icons[0].url) {
      imgDom = document.createElement('img');
      imgDom.src = item.icons[0].url;
      itemWrap.appendChild(imgDom);
    }
    if(item.name) {
      titleDom = document.createElement('p');
      enableDom = document.createElement('span');
      enableDom.innerHTML = item.enabled ? '已开启' : '已关闭';
      titleDom.innerHTML = item.name;
      titleDom.appendChild(enableDom);
      itemWrap.appendChild(titleDom);
    }
    itemCName = item.enabled ? 'itemwrap' : 'itemwrap disabled';
    itemWrap.setAttribute('data-id', item.id);
    itemWrap.setAttribute('data-enabled', item.enabled);
    itemWrap.className = itemCName;
    document.body.appendChild(itemWrap);
    itemWrap.addEventListener('click', function(e) {
      var curItem = e.currentTarget;
      var itemId = curItem.getAttribute('data-id');
      var enabled = curItem.getAttribute('data-enabled') === 'true' ? true: false;
      chrome.management.setEnabled(itemId, !enabled);
      curItem.className = !enabled ? 'itemwrap' : 'itemwrap disabled';
      curItem.setAttribute('data-enabled', !enabled);
      curItem.querySelector('span').innerHTML = !enabled ? '已开启' : '已关闭';
    });
  })

})
