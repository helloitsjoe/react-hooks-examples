const wait = (ms = 0) => new Promise(resolve => setTimeout(resolve, ms));
export const getRandom = arr => {
  const index = Math.floor(Math.random() * arr.length);
  return arr[index];
};

export const fetchImage = query =>
  wait(1000).then(() => {
    return imageData[query.toLowerCase()];
  });

const imageData = {
  rome: [
    {
      alt: 'Roman Colosseum, Italy under clear sky during golden hour',
      hotlink: 'https://unsplash.com/photos/YpKiwlvhOpI',
      src:
        'https://images.unsplash.com/photo-1503970999490-4404449dc349?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjg4MzkyfQ',
    },
    {
      alt: 'aerial photography of city',
      hotlink: 'https://unsplash.com/photos/0Bs3et8FYyg',
      src:
        'https://images.unsplash.com/photo-1531572753322-ad063cecc140?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjg4MzkyfQ',
    },
    {
      alt: 'brown dome concrete building near bridge at daytime',
      hotlink: 'https://unsplash.com/photos/7ybKmhDTcz0',
      src:
        'https://images.unsplash.com/photo-1529260830199-42c24126f198?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjg4MzkyfQ',
    },
    {
      alt: 'gray concrete building',
      hotlink: 'https://unsplash.com/photos/oI141-aIwnQ',
      src:
        'https://images.unsplash.com/photo-1542820229-081e0c12af0b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjg4MzkyfQ',
    },
    {
      alt: 'Coliseum, Italy',
      hotlink: 'https://unsplash.com/photos/s87bBFZviAU',
      src:
        'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjg4MzkyfQ',
    },
    {
      alt: 'brown concrete house',
      hotlink: 'https://unsplash.com/photos/I1Lv2yX67GI',
      src:
        'https://images.unsplash.com/photo-1525874684015-58379d421a52?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjg4MzkyfQ',
    },
    {
      alt: 'woman standing near Colosseum, Rome',
      hotlink: 'https://unsplash.com/photos/S0hS0HfH_B8',
      src:
        'https://images.unsplash.com/photo-1537799943037-f5da89a65689?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjg4MzkyfQ',
    },
    {
      alt: 'Colosseum arena photography',
      hotlink: 'https://unsplash.com/photos/VFRTXGw1VjU',
      src:
        'https://images.unsplash.com/photo-1552832230-c0197dd311b5?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjg4MzkyfQ',
    },
    {
      alt: 'gold Volkswagen Beetle near building',
      hotlink: 'https://unsplash.com/photos/RH0QUHYPeW4',
      src:
        'https://images.unsplash.com/photo-1539285023874-eb2cc9fd5eea?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjg4MzkyfQ',
    },
    {
      alt: 'photography of inside black structure',
      hotlink: 'https://unsplash.com/photos/-0gBnnMdQPw',
      src:
        'https://images.unsplash.com/photo-1491566102020-21838225c3c8?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjg4MzkyfQ',
    },
  ],
  paris: [
    {
      alt: 'Eiffel Tower, Paris France',
      hotlink: 'https://unsplash.com/photos/nnzkZNYWHaU',
      src:
        'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjg4MzkyfQ',
    },
    {
      alt: 'Eiffel tower during daytime',
      hotlink: 'https://unsplash.com/photos/Q0-fOL2nqZc',
      src:
        'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjg4MzkyfQ',
    },
    {
      alt: 'bridge during night time',
      hotlink: 'https://unsplash.com/photos/R5scocnOOdM',
      src:
        'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjg4MzkyfQ',
    },
    {
      alt: 'Eiffel Tower under blue sky during daytime',
      hotlink: 'https://unsplash.com/photos/WSvth_lwCi0',
      src:
        'https://images.unsplash.com/photo-1549144511-f099e773c147?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjg4MzkyfQ',
    },
    {
      alt: 'Arc the Triumph, Paris France',
      hotlink: 'https://unsplash.com/photos/TVyjcTEKHLU',
      src:
        'https://images.unsplash.com/photo-1503248739195-65669aaf5b0f?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjg4MzkyfQ',
    },
    {
      alt: "bird's-eye view photography of Eiffel Tower under cloudy sky",
      hotlink: 'https://unsplash.com/photos/Vi9cHboZwss',
      src:
        'https://images.unsplash.com/photo-1509041322357-8a3f9757a475?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjg4MzkyfQ',
    },
    {
      alt: 'high-rise buildings during daytime',
      hotlink: 'https://unsplash.com/photos/t9Td0zfDTwI',
      src:
        'https://images.unsplash.com/photo-1550340499-a6c60fc8287c?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjg4MzkyfQ',
    },
    {
      alt: 'vehicles travelling on road surrounded by buildings during daytime',
      hotlink: 'https://unsplash.com/photos/DXuxHw3S5ak',
      src:
        'https://images.unsplash.com/photo-1522093007474-d86e9bf7ba6f?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjg4MzkyfQ',
    },
    {
      alt: 'Eiffel Tower at Paris, France',
      hotlink: 'https://unsplash.com/photos/QAwciFlS1g4',
      src:
        'https://images.unsplash.com/photo-1431274172761-fca41d930114?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjg4MzkyfQ',
    },
    {
      alt:
        'bike leaning against handrail in front of concrete building at daytime',
      hotlink: 'https://unsplash.com/photos/Hf4Ap1-ef40',
      src:
        'https://images.unsplash.com/photo-1471623320832-752e8bbf8413?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjg4MzkyfQ',
    },
  ],
  london: [
    {
      alt: 'photo of Elizabeth Tower, London',
      hotlink: 'https://unsplash.com/photos/EXdXLrZXS9Q',
      src:
        'https://images.unsplash.com/photo-1505761671935-60b3a7427bad?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjg4MzkyfQ',
    },
    {
      alt: 'aerial photography of London skyline during daytime',
      hotlink: 'https://unsplash.com/photos/Oja2ty_9ZLM',
      src:
        'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjg4MzkyfQ',
    },
    {
      alt: 'photo of car and bus near castle',
      hotlink: 'https://unsplash.com/photos/g-krQzQo9mI',
      src:
        'https://images.unsplash.com/photo-1526129318478-62ed807ebdf9?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjg4MzkyfQ',
    },
    {
      alt: 'Big Ben tower',
      hotlink: 'https://unsplash.com/photos/mOEqOtmuPG8',
      src:
        'https://images.unsplash.com/photo-1529655683826-aba9b3e77383?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjg4MzkyfQ',
    },
    {
      alt: 'London Bridge, London',
      hotlink: 'https://unsplash.com/photos/Q6UehpkBSnQ',
      src:
        'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjg4MzkyfQ',
    },
    {
      alt:
        'red double-decker bus passing Palace of Westminster, London during daytime',
      hotlink: 'https://unsplash.com/photos/tZDtyUrYrFU',
      src:
        'https://images.unsplash.com/photo-1488747279002-c8523379faaa?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjg4MzkyfQ',
    },
    {
      alt: 'aerial view of building',
      hotlink: 'https://unsplash.com/photos/LqZJf4ukqz0',
      src:
        'https://images.unsplash.com/photo-1480449649358-ee14c6ee0b17?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjg4MzkyfQ',
    },
    {
      alt: 'Elizabeth Tower, London',
      hotlink: 'https://unsplash.com/photos/1Z7QDZqT2QQ',
      src:
        'https://images.unsplash.com/photo-1494922275507-58dc039ed337?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjg4MzkyfQ',
    },
    {
      alt: 'photo of bus passing on city with lights',
      hotlink: 'https://unsplash.com/photos/7iNteV_zTRU',
      src:
        'https://images.unsplash.com/photo-1514729797186-944d57303199?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjg4MzkyfQ',
    },
  ],
  tokyo: [
    {
      alt: 'people walking on road near well-lit buildings',
      hotlink: 'https://unsplash.com/photos/layMbSJ3YOE',
      src:
        'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjg4MzkyfQ',
    },
    {
      alt: 'photo of people crossing road',
      hotlink: 'https://unsplash.com/photos/4HG5hlhmZg8',
      src:
        'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjg4MzkyfQ',
    },
    {
      alt: 'architectural photo of tower between buildings',
      hotlink: 'https://unsplash.com/photos/7H77FWkK_x4',
      src:
        'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjg4MzkyfQ',
    },
    {
      alt: 'Eiffel Tower, Paris during dusk',
      hotlink: 'https://unsplash.com/photos/IocJwyqRv3M',
      src:
        'https://images.unsplash.com/photo-1513407030348-c983a97b98d8?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjg4MzkyfQ',
    },
    {
      alt: 'men in black suits standing in the hallway',
      hotlink: 'https://unsplash.com/photos/tKCd-IWc4gI',
      src:
        'https://images.unsplash.com/photo-1554797589-7241bb691973?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjg4MzkyfQ',
    },
    {
      alt: 'three bicycles parked in front of building',
      hotlink: 'https://unsplash.com/photos/hwLAI5lRhdM',
      src:
        'https://images.unsplash.com/photo-1480796927426-f609979314bd?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjg4MzkyfQ',
    },
    {
      alt: 'timelapse photography of vehicles and buildings',
      hotlink: 'https://unsplash.com/photos/4u2U8EO9OzY',
      src:
        'https://images.unsplash.com/photo-1498036882173-b41c28a8ba34?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjg4MzkyfQ',
    },
    {
      alt: 'people gathered on street',
      hotlink: 'https://unsplash.com/photos/Mn9Fa_wQH-M',
      src:
        'https://images.unsplash.com/photo-1494587416117-f102a2ac0a8d?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjg4MzkyfQ',
    },
    {
      alt: 'aerial view of people walking on cross pedestrian lane',
      hotlink: 'https://unsplash.com/photos/TRJjPc0wss0',
      src:
        'https://images.unsplash.com/photo-1548783307-f63adc3f200b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjg4MzkyfQ',
    },
    {
      alt: 'people walking between city building',
      hotlink: 'https://unsplash.com/photos/_noSmX8Kgoo',
      src:
        'https://images.unsplash.com/photo-1551641506-ee5bf4cb45f1?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjg4MzkyfQ',
    },
  ],
  boston: [
    {
      alt: 'aerial view of high rise building at daytime',
      hotlink: 'https://unsplash.com/photos/xJueGJJHnWs',
      src:
        'https://images.unsplash.com/photo-1501979376754-2ff867a4f659?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjg4MzkyfQ',
    },
    {
      alt: 'high-rise buildings',
      hotlink: 'https://unsplash.com/photos/iRKv_XiN--M',
      src:
        'https://images.unsplash.com/photo-1556079337-a837a2d11f04?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjg4MzkyfQ',
    },
    {
      alt: 'landscape photography of city during nightime',
      hotlink: 'https://unsplash.com/photos/PoHAyYLpkOM',
      src:
        'https://images.unsplash.com/photo-1540888513280-fac1aa56c69f?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjg4MzkyfQ',
    },
    {
      alt: 'USA flag on street during daytime',
      hotlink: 'https://unsplash.com/photos/lT2hiMUACco',
      src:
        'https://images.unsplash.com/photo-1531874668635-85a25b7279a2?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjg4MzkyfQ',
    },
    {
      alt: 'architectural photography of city',
      hotlink: 'https://unsplash.com/photos/NrDYqseeAxk',
      src:
        'https://images.unsplash.com/photo-1506551907304-60bb62ffc9b0?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjg4MzkyfQ',
    },
    {
      alt: 'city building during daytime',
      hotlink: 'https://unsplash.com/photos/cNgsAdd4-m4',
      src:
        'https://images.unsplash.com/photo-1488750059241-ed3ad4563245?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjg4MzkyfQ',
    },
    {
      alt: 'brown concrete building with patio light during daytime',
      hotlink: 'https://unsplash.com/photos/ZLN2WOVpjCo',
      src:
        'https://images.unsplash.com/photo-1458086294493-3a5a041289ff?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjg4MzkyfQ',
    },
    {
      alt: 'black high buildings at nighttime',
      hotlink: 'https://unsplash.com/photos/sxnuzW9ZWu0',
      src:
        'https://images.unsplash.com/photo-1495473351003-ba0a460f7961?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjg4MzkyfQ',
    },
    {
      alt: 'aerial view of city under cloudy sky during daytime',
      hotlink: 'https://unsplash.com/photos/xhpMNieqBwA',
      src:
        'https://images.unsplash.com/photo-1502921982-f2471545c93b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjg4MzkyfQ',
    },
    {
      alt: "bird's-eye view of city",
      hotlink: 'https://unsplash.com/photos/VDS8ASoyzjw',
      src:
        'https://images.unsplash.com/photo-1430609098125-581618d0482f?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjg4MzkyfQ',
    },
  ],
};
