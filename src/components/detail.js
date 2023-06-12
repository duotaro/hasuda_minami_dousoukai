export default function Detail({  }) {
  return (
    <section className="page-section" id="services">
        <div className="container px-4 px-lg-5">
            <h2 className="text-center mt-0">同窓会詳細</h2>
            <hr className="divider" />
            <div className="row gx-4 gx-lg-5">
                <div className="col-lg-3 col-md-6 text-center">
                    <div className="mt-5">
                        <div className="mb-2"><i className="bi-gem fs-1 text-primary"></i></div>
                        <h3 className="h4 mb-2">開催日</h3>
                        <p className="text-muted mb-0">2023年7月22日土曜日</p>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6 text-center">
                    <div className="mt-5">
                        <div className="mb-2"><i className="bi-globe fs-1 text-primary"></i></div>
                        <h3 className="h4 mb-2">開催時刻</h3>
                        <p className="text-muted mb-0">17:00〜21:00</p>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6 text-center">
                    <div className="mt-5">
                        <div className="mb-2"><i className="bi-laptop fs-1 text-primary"></i></div>
                        <h3 className="h4 mb-2">開催場所</h3>
                        <p className="text-muted mb-0"><a href="https://kitchen.dkdining.com/oomiya/" target="_blank">大宮キッチン</a></p>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6 text-center">
                    <div className="mt-5">
                        <div className="mb-2"><i className="bi-heart fs-1 text-primary"></i></div>
                        <h3 className="h4 mb-2">会費</h3>
                        <p className="text-muted mb-0">5000円</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
}