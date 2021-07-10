import { Link, useParams } from "react-router-dom";
import { useGetDrawingQuery } from "__generated__/graphql";

interface ParamTypes {
  workspaceSlug: string;
  drawingId: string;
}

export function DrawingMenu() {
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

  if (!data && loading) {
    return <div>loading</div>;
  }

  if (!data || !data.drawing) {
    return <div>no drawing..</div>;
  }

  const { drawing } = data;

  return (
    <div>
      <div>drawings:</div>
      {drawing.workspace.drawings.map((workspaceDrawing) => {
        return (
          <div key={workspaceDrawing.id}>
            <Link to={`/${drawing.workspace.slug}/${workspaceDrawing.id}`}>
              {workspaceDrawing.name}
            </Link>
          </div>
        );
      })}
    </div>
  );
}
