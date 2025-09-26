import React from 'react';

export const TailwindTest: React.FC = () => {
  return (
    <div className="tw-bg-blue-500 tw-text-white tw-p-4 tw-rounded-lg tw-shadow-lg">
      <h2 className="tw-text-xl tw-font-bold tw-mb-2">Tailwind CSS Test</h2>
      <p className="tw-text-sm">
        This component uses Tailwind CSS with the <code className="tw-bg-gray-200 tw-px-1 tw-rounded">-tw</code> prefix.
      </p>
      <div className="tw-mt-4 tw-flex tw-gap-2">
        <button className="tw-bg-green-500 hover:tw-bg-green-600 tw-text-white tw-px-4 tw-py-2 tw-rounded">
          Success Button
        </button>
        <button className="tw-bg-red-500 hover:tw-bg-red-600 tw-text-white tw-px-4 tw-py-2 tw-rounded">
          Danger Button
        </button>
      </div>
    </div>
  );
};
