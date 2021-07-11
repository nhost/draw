import { CollectionNew } from "components/collections/collection-new";
import { Main } from "components/layout/main";
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
    <Main>
      <div>
        <div className="text-4xl py-3">{workspace.name}</div>

        <div>
          <div>Collections</div>
          <div>
            {workspace.collections.map((collection) => {
              return (
                <div key={collection.id}>
                  <div>
                    <Link to={`/${workspaceSlug}/${collection.id}`}>
                      {collection.name}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <CollectionNew workspaceId={workspace.id} />
        </div>
        <div className="my-4">
          <div>Workspace members</div>
          <div>
            {workspace.workspaceMemebers.map((workspaceMember) => {
              return (
                <div key={workspaceMember.id}>
                  {workspaceMember.member.display_name} ({workspaceMember.type})
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Main>
  );
}
