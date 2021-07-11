import { useState } from "react";
import { Button, TextField } from "components/ui";
import {
  GetDrawingFragmentsFragment,
  refetchGetDrawingQuery,
  useGetDrawingQuery,
  useUpdateDrawingMutation,
} from "__generated__/graphql";

type DrawingSettingsProps = {
  drawingId: string | null;
};

function DrawingSettingsDataLoaded({
  drawing,
}: {
  drawing: GetDrawingFragmentsFragment;
}) {
  const [name, setName] = useState(drawing.name);
  const [isPublic, setIsPublic] = useState(drawing.isPublic);

  const [updateDrawing, { loading }] = useUpdateDrawingMutation();

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();

    await updateDrawing({
      variables: {
        drawingId: drawing.id,
        drawing: {
          name,
          isPublic,
        },
      },
      refetchQueries: [
        refetchGetDrawingQuery({
          drawingId: drawing.id,
        }),
      ],
    });
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <TextField value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          Public:{" "}
          <input
            type="checkbox"
            checked={isPublic}
            onChange={() => setIsPublic(!isPublic)}
          />
        </div>
        {isPublic && (
          <div>
            <a
              href={`https://nhostdraw.netlify.app/public/${drawing.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-blue-600"
            >
              https://nhostdraw.netlify.app/public/{drawing.id}
            </a>
          </div>
        )}
        <div>
          <Button loading={loading}>Save</Button>
        </div>
      </form>
    </div>
  );
}

export function DrawingSettings({ drawingId }: DrawingSettingsProps) {
  const { data, loading, error } = useGetDrawingQuery({
    variables: {
      drawingId,
    },
    fetchPolicy: "cache-and-network",
  });

  console.log(data);

  if (error) {
    console.log(error);
    return <div>error</div>;
  }

  if (!data && loading) {
    return <div>loading here?</div>;
  }

  if (!data || !data.drawing) {
    return <div>no drawing found..</div>;
  }

  const { drawing } = data;

  return <DrawingSettingsDataLoaded drawing={drawing} />;
}
