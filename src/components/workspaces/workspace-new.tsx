import { useState } from "react";
import { useHistory } from "react-router-dom";
import slugify from "slugify";
import { nhost } from "utils/nhost";
import { useInsertWorkspaceMutation } from "__generated__/graphql";
import { Button } from "components/ui";

export function WorkspaceNew() {
  const [name, setName] = useState("");
  const history = useHistory();

  const [insertWorkspace, { error, loading }] = useInsertWorkspaceMutation();

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();

    const slug = slugify(name, {
      lower: true,
      strict: true,
    });

    await insertWorkspace({
      variables: {
        workspace: {
          name,
          slug,
          workspaceMemebers: {
            data: [
              {
                memberUserId: nhost.auth.user()?.id,
                type: "admin",
              },
            ],
          },
        },
      },
    });

    history.push(`/${slug}`);
  }

  return (
    <div>
      <div>Crete new workspace</div>
      {error && <div>error inserting workspace</div>}
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border rounded shadow-md px-2 py-1 my-2"
          />
          <div>
            <Button
              className="border rounded px-3 py-2"
              type="submit"
              disabled={loading}
            >
              Create workspace
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
