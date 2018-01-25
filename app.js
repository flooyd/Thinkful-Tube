$(() => {
  let items = [];
  let nextPage = '';
  let query = '';

  search = showMore => {
    let params = {
      part: 'snippet',
      key: 'AIzaSyBxNr2OGUF-GeC2byGuWkWU-RUvpmIxiZI',
      q: query,
      pageToken: nextPage
    };
    console.log(params);

    $.getJSON('https://www.googleapis.com/youtube/v3/search', params)
    .done(data => {
      parseData(data);
      renderItems(showMore);
    })
    .fail(()=> {
      console.log('fail')
    })

  }

  parseData = data => {
    nextPage = data.nextPageToken;
    items = [];
    data.items.forEach(item => {
      items.push({
        url: item.snippet.thumbnails.high.url,
        title: item.snippet.title,
        channel: item.snippet.channelTitle,
        channelId: item.snippet.channelId,
        videoId: item.id.videoId
      });
    });
  }

  renderItems = (showMore) => {
    const results = $('.results-js');

    if(!showMore) {
      $(results).empty();
    }
    
    items.forEach(item => {
      const videoLink = `https://www.youtube.com/watch?v=${item.videoId}`;
      const channelLink = `https://www.youtube.com/channel/${item.channelId}`
      $(results).append(
        `<li>
        <div class="title">
          ${item.title}
        </div>
        <div>
          Channel: <a href=${channelLink} target=_blank>${item.channel}</a>
        </div>
        <img id=${item.videoId} src=${item.url}>
      </li>`
      );
    });
  };

  renderModal = videoId => {
    let src = `https://www.youtube.com/embed/${videoId}?rel=0&autoplay=0`;
    $('.video').empty().append(
      `
      <iframe height="100%" width="100%" src=${src} frameborder="0" allowfullscreen></iframe>
      `
    );
    $('.videoModal-js').css('display', 'block');
  }

  handleMainClicked = () => {
    $('.videoModal-js').click(e => {
      $('iframe').prop('src', '');
      $('.videoModal-js').css('display', 'none');
    });
  };

  handleSubmit = () => {
    $('form').submit(e => {
      e.preventDefault();
      query = $('input').val();
      nextPage = '';
      setTimeout(()=> {
        $('.more-js').css('display', 'block');
      }, 500)
      
      search();
    });
  };

  handleMoreClicked = () => {
    $('.more-js').click(e => {
      search(true);
    })
  }

  handleVideoClicked = () => {
    $('.results-js').on('click', 'img', e => {
      let videoId = $(e.currentTarget).prop('id');
      renderModal(videoId)
    });
  };

  handleSubmit();
  handleVideoClicked();
  handleMainClicked();
  handleMoreClicked();
})