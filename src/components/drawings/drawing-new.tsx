import { Button, TextField } from "components/ui";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useInsertDrawingMutation } from "__generated__/graphql";

export function DrawingNew({ collectionId }: { collectionId: string }) {
  const [name, setName] = useState("");
  const history = useHistory();

  const [insertWorkspace, { error, loading }] = useInsertDrawingMutation();

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();

    const { data } = await insertWorkspace({
      variables: {
        drawing: {
          name,
          collectionId,
        },
      },
    });

    history.push(
      `/${data?.insertDrawing?.collection.workspace.slug}/${data?.insertDrawing?.collection.id}/${data?.insertDrawing?.id}`
    );
  }

  return (
    <div className="border rounded p-4">
      <div>Create new drawing</div>
      {error && <div>error creating drawing</div>}
      <div>
        <form onSubmit={handleSubmit}>
          <TextField
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div>
            <Button className="my-3" type="submit" disabled={loading}>
              Create drawing
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
