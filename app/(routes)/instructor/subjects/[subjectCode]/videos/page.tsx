// Components
import PageTitle from "@/components/page-title";
import AddVideoButton from "@/app/_features/instructor/manage-videos/add-video-button";
import SubjectVideos from "@/app/_features/instructor/manage-videos/subject-videos";

export default function VideosPage({
  params,
}: {
  params: { subjectCode: string };
}) {
  return (
    <div>
      <div className="flex justify-between items-center">
        <PageTitle title="Manage PRL Videos" />
        <AddVideoButton subjectCode={params.subjectCode} />
      </div>
      <SubjectVideos />
    </div>
  );
}
