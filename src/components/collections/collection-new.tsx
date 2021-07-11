import { Button, TextField } from "components/ui";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useInsertCollectionMutation } from "__generated__/graphql";

export function CollectionNew({ workspaceId }: { workspaceId: string }) {
  const [name, setName] = useState("");
  const history = useHistory();

  const [insertCollection, { error, loading }] = useInsertCollectionMutation();

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();

    const { data } = await insertCollection({
      variables: {
        collection: {
          name,
          workspaceId,
        },
      },
    });

    history.push(
      `/${data?.insertCollection?.workspace.slug}/${data?.insertCollection?.id}`
    );
  }

  return (
    <div className="border rounded p-4">
      <div>Create new collection</div>
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
              Create Collection
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
