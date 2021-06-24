import { useHistory } from 'react-router-dom';
import { ChevronDoubleLeftIcon } from '@heroicons/react/solid';

const BackButton = ({hide, onClick}) => {
  const history = useHistory();

  return hide ? null : (
    <button
      className="bg-yellow-400 py-2 px-4 rounded-md hover:bg-yellow-500 text-gray-600 text-sm"
    >
      <ChevronDoubleLeftIcon
        aria-hidden="true"
        className="h-5 w-5 text-gray-500"
        onClick={onClick ? onClick : () => history.push("/")}
      />
    </button>
  );
}

export default BackButton;