import { useState } from "react";
import { SvgCog } from "components/svg";
import { Link, useParams } from "react-router-dom";
import { useGetDrawingQuery } from "__generated__/graphql";
import { DrawingSettings } from "./drawing-settings";
import { Modal } from "components/ui/modal";

interface ParamTypes {
  workspaceSlug: string;
  collectionId: string;
  drawingId: string;
}

export function DrawingMenu() {
  const { workspaceSlug, collectionId, drawingId } = useParams<ParamTypes>();

  const [drawingIdSetting, setDrawingIdSetting] = useState<null | string>(null);

  const { data, loading, error } = useGetDrawingQuery({
    variables: {
      drawingId,
    },
  });

  if (error) {
    console.log(error);
    return <div>error</div>;
  }

  if (!data && loading) {
    return <div>loading</div>;
  }

  if (!data || !data.drawing) {
    return <div>no drawing..</div>;
  }

  const { drawing } = data;

  return (
    <div>
      <div className="my-2 text-2xl">
        <Link to={`/${drawing.collection.workspace.slug}`}>
          {drawing.collection.workspace.slug}
        </Link>
      </div>
      <div className="font-bold mt-8 mb-4">
        <Link to={`/${workspaceSlug}/${collectionId}`}>
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z"
                clipRule="evenodd"
              />
            </svg>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
            {drawing.collection.name}
          </div>
        </Link>
      </div>
      <div>
        {drawing.collection.drawings.map((drawing) => {
          return (
            <div
              className="flex items-center justify-between border-b border-gray-200 hover:bg-gray-100 transition-all duration-200 ease-in-out"
              key={drawing.id}
            >
              <Link
                to={`/${workspaceSlug}/${collectionId}/${drawing.id}`}
                className=" block py-2 px-4 w-full mr-4"
              >
                {drawing.name}
              </Link>
              {drawing.id === drawingId && (
                <div className="h-full ">
                  <div
                    onClick={() => setDrawingIdSetting(drawing.id)}
                    className="px-3 cursor-pointer"
                  >
                    <SvgCog />
                  </div>
                </div>
              )}
            </div>
          );
        })}
        {drawingIdSetting && (
          <Modal open={true} onClose={() => setDrawingIdSetting(null)}>
            <DrawingSettings drawingId={drawingIdSetting} />
          </Modal>
        )}
      </div>
    </div>
  );
}
