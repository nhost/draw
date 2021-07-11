import { useRef } from "react";
import { useParams } from "react-router-dom";
import {
  GetPublicDrawingFragmentsFragment,
  useGetPublicDrawingQuery,
} from "__generated__/graphql";
import Excalidraw from "@excalidraw/excalidraw";

interface ParamTypes {
  drawingId: string;
}

function DrawingDataLoaded({
  drawing,
}: {
  drawing: GetPublicDrawingFragmentsFragment;
}) {
  const excalidrawRef = useRef(null) as any;

  // need to set collaborators to new Map();
  const appStateFromDb = drawing.appState;
  const initAppState = {
    ...appStateFromDb,
    collaborators: new Map(),
  };

  const initialData = {
    elements: drawing.elements,
    appState: initAppState,
  };

  return (
    <div className="h-screen w-screen bg-blue-800">
      <Excalidraw
        ref={excalidrawRef}
        initialData={initialData}
        // onPointerUpdate={(payload) => console.log(payload)}
        isCollaborating={true}
        UIOptions={{
          canvasActions: {
            saveAsImage: false,
            saveToActiveFile: false,
            changeViewBackgroundColor: true,
            clearCanvas: false,
            export: false,
            loadScene: true,
            theme: true,
          },
        }}
        viewModeEnabled={true}
        zenModeEnabled={false}
        gridModeEnabled={false}
        name="Nhost custom gogo"
      />
    </div>
  );
}

export function PublicDrawing() {
  const { drawingId } = useParams<ParamTypes>();

  console.log(drawingId);

  const { data, loading, error } = useGetPublicDrawingQuery({
    variables: {
      drawingId,
    },
  });

  console.log("rerender PublicDrawing");

  if (error) {
    console.log(error);
    return <div>error</div>;
  }

  if (!data && loading) {
    return <div>loading</div>;
  }

  if (!data || data.publicDrawings.length === 0) {
    return <div>no drawing..</div>;
  }

  const drawing = data.publicDrawings[0];

  console.log(drawing);

  return <DrawingDataLoaded drawing={drawing} />;
}
