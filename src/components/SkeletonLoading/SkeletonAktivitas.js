import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function SkeletonAktivitas() {
  const result_style = {
    marginTop: '14px',
    zIndex: '9999',
    marginLeft: '-2px',
  }

  const square_skeleton = {
    height: '120px',
    borderRadius: '15px',
  }

  // const skeleton_progress = {
  //   height: '3px',
  //   marginTop: '10px',
  //   marginBottom: '0px',
  //   paddingBottom: '0px',
  // }

  const skeleton_title = {
    height: '24px',
  }

  const skeleton_sub = {
    height: '11.5px',
    marginTop: '-8px',
  }

  const skeleton_sub_div = {
    marginTop: '10px',
  }

  return (
    <div style={result_style} className="flex">
      <div className="mr-5 w-[120px]">
        <Skeleton style={square_skeleton} />
      </div>
      <div className="flex-grow mr-2 mt-1 mb-0">
        <Skeleton count={2} style={skeleton_title} />
        {/* <Skeleton style={skeleton_progress} /> */}
        <div className="grid grid-cols-2" style={skeleton_sub_div}>
          <div className="mr-2 mt-0">
            <Skeleton count={2} style={skeleton_sub} />
          </div>
          <div className="mr-2 mt-0">
            <Skeleton count={2} style={skeleton_sub} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SkeletonAktivitas
