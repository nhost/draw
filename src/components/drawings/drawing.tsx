import { useRef, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  GetDrawingFragmentsFragment,
  useGetDrawingQuery,
  useUpdateDrawingMutation,
} from "__generated__/graphql";
import Excalidraw from "@excalidraw/excalidraw";

interface ParamTypes {
  workspaceSlug: string;
  drawingId: string;
}

function DrawingDataLoaded({
  drawing,
}: {
  drawing: GetDrawingFragmentsFragment;
}) {
  const excalidrawRef = useRef(null) as any;

  // need to set collaborators to new Map();
  const appStateFromDb = drawing.appState;
  const appState = {
    ...appStateFromDb,
    collaborators: new Map(),
  };

  const initialData = {
    elements: drawing.elements,
    appState,
  };

  const [updateDrawing] = useUpdateDrawingMutation();

  async function autoSaveToDBsetShow() {
    // const curr = excalidrawRef.current; //.getSceneElements(),

    const elements = excalidrawRef.current.getSceneElements();
    const appState = excalidrawRef.current.getAppState();

    await updateDrawing({
      variables: {
        drawingId: drawing.id,
        drawing: {
          elements,
          appState,
        },
      },
    });
  }

  useEffect(() => {
    const autoSave = setInterval(() => autoSaveToDBsetShow(), 2000);

    return () => {
      clearInterval(autoSave);
    };
  });

  return (
    <div className="h-screen w-screen grid grid-cols-12">
      <div>
        <Link to={`/${drawing.workspace.slug}`}>Go back</Link>
      </div>
      <div className="col-span-11">
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
          viewModeEnabled={false}
          zenModeEnabled={false}
          gridModeEnabled={false}
          name="Nhost custom gogo"
        />
      </div>
    </div>
  );
}

export function Drawing() {
  const { drawingId } = useParams<ParamTypes>();

  const { data, loading, error } = useGetDrawingQuery({
    variables: {
      drawingId,
    },
  });

  if (error) {
    console.log(error);
    return <div>error</div>;
  }

  if (loading) {
    return <div>loading</div>;
  }

  if (!data || !data.drawing) {
    return <div>no drawing..</div>;
  }

  return <DrawingDataLoaded drawing={data.drawing} />;
}
