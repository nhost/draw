import { DrawingNew } from "components/drawings/drawing-new";
import { Link, useParams } from "react-router-dom";
import { useGetWorkspaceBySlugQuery } from "__generated__/graphql";

interface ParamTypes {
  workspaceSlug: string;
}

export function WorkspaceDashboard() {
  const { workspaceSlug } = useParams<ParamTypes>();
  console.log(workspaceSlug);

  const { data, loading, error } = useGetWorkspaceBySlugQuery({
    variables: {
      workspaceSlug,
    },
  });

  if (error) {
    console.log(error);
    return <div>error</div>;
  }

  if (loading) {
    return <div>loading</div>;
  }

  const workspace = data?.workspaces[0];

  if (!workspace) {
    return <div>no workspace</div>;
  }

  return (
    <div>
      <div className="text-4xl py-3">{workspace.name}</div>

      <div>
        <DrawingNew workspaceId={workspace.id} />
      </div>

      <div>
        <div>Drawings:</div>
        <div>
          {workspace.drawings.map((drawing) => {
            return (
              <div key={drawing.id}>
                <div>
                  <Link to={`/${workspaceSlug}/${drawing.id}`}>
                    {drawing.name}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
