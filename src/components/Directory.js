import { Link } from "react-router-dom";

const MANTRA = 'MANTRA';
const PRAYER = 'PRAYER'; 

const items = {
  // DURGA: [],
  GANESHA: [],
  // HANUMAN: [],
  PRANAVA: [
    {
      id: 1,
      transliteration: 'Om',
      sanskrit: 'ॐ',
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Aum_Om_black.svg/356px-Aum_Om_black.svg.png',
        type: MANTRA,
    },
  ],
  SHIVA: [
    {
      id: 2,
      transliteration: 'Om Namaha Shivaya',
      sanskrit: 'ॐ नमः शिवाय',
      imageUrl:
        'https://i0.wp.com/canariasagusto.com/wp-content/uploads/2012/04/Rishikesh-2010-0691.jpg?resize=785%2C588&ssl=1',
      type: MANTRA,
    },
    {
      id: 3,
      transliteration: 'Om Shiva Babaji Nama Om',
      sanskrit: 'ॐ नमः शिवाय',
      imageUrl:
        'https://images.squarespace-cdn.com/content/v1/5c1d1eae75f9ee1389593510/1587318289627-OUN6TPAQZMFXA141R5KC/ke17ZwdGBToddI8pDm48kOocpZx0xlvWaMfujuqmZxF7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QHyNOqBUUEtDDsRWrJLTmujyyI7Frso6MRdplGTbhDuXZECgQPB9cqfz5W6M2bbtdO48clcURN-OsvwxYNGXR/Shiva.jpg?format=500w',
      type: MANTRA,
    },
    {
      id: 4,
      transliteration: 'Mahamrityunjaya',
      sanskrit: 'ॐ नमः शिवाय ॐ नमः शिवाय ॐ नमः शिवाय',
      imageUrl:
        'https://www.artcollectorz.com/assets/managed/images/cache/ABSCMAAA6QA6MAIAAAAAB5AB4YA7777774AAAAAALABEOAQA.jpg',
      type: MANTRA,
    },
  ],
  "CIRCULO DE LUZ": [
    {
      id: 5,
      transliteration: 'Amanece y la Luz se expande',
      sanskrit: 'Mataji Shaktiananda',
      imageUrl:
        'https://wau.org/images/issues/_articleImage/22413resolve-retina.jpg',
      type: PRAYER,
    },
  ]
}

const Directory = () => {
  return (
    <nav className="h-full overflow-y-auto" aria-label="Directory">
      {Object.keys(items).map(group => (
        <div key={group} className="relative">
          <div className="z-10 sticky top-0 border-t border-b border-gray-200 bg-gray-50 px-6 py-1 text-sm font-medium text-gray-500">
            <h3>{group}</h3>
          </div>
          <ul className="relative z-0 divide-y divide-gray-200">
            {items[group].map((item) => (
              <li key={item.id} className="bg-white">
                <div className="relative px-6 py-5 flex items-center space-x-3 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
                  <div className="flex-shrink-0">
                    <img className="h-10 w-10 rounded-full" src={item.imageUrl} alt="" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link
                      className="focus:outline-none"
                      to={item.type === MANTRA ? "/mantra/8888" : "/prayer/9999"}
                    >
                      {/* Extend touch target to entire panel */}
                      <span className="absolute inset-0" aria-hidden="true" />
                      <p className="text-sm font-medium text-gray-900">{item.transliteration}</p>
                      <p className="text-sm text-gray-500 truncate">{item.sanskrit}</p>
                    </Link>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  )
}

export default Directory;