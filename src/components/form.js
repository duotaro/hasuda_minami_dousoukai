export default function Form({  }) {
    return (
        <div className="row gx-4 gx-lg-5 justify-content-center mb-5">
            <div className="col-lg-6">
                <form id="contactForm" data-sb-form-api-token="API_TOKEN">
                    <div className="form-floating mb-3">
                        <input className="form-control" id="name" type="text" placeholder="Enter your name..." data-sb-validations="required" />
                        <label for="name">氏名</label>
                        <div className="invalid-feedback" data-sb-feedback="name:required">指名は必須です。</div>
                    </div>
                    <div className="form-floating mb-3">
                        <input className="form-control" id="email" type="email" placeholder="name@example.com" data-sb-validations="required,email" />
                        <label for="email">メールアドレス</label>
                        <div className="invalid-feedback" data-sb-feedback="email:required">メールアドレスは必須です。</div>
                        <div className="invalid-feedback" data-sb-feedback="email:email">メールアドレスが正しくありません。</div>
                    </div>
                    <div className="form-floating mb-3">
                        <input className="form-control" id="address" type="text" placeholder="(123) 456-7890" data-sb-validations="required" />
                        <label for="phone">住所</label>
                        <div className="invalid-feedback" data-sb-feedback="phone:required">住所は必須です。</div>
                    </div>
                    <div className="form-floating mb-3">
                        <textarea className="form-control" id="message" type="text" placeholder="Enter your message here..." style={{height: '10rem'}} data-sb-validations="required"></textarea>
                        <label for="message">メッセージ(要望など)</label>
                    </div>
                    <div className="d-none" id="submitSuccessMessage">
                        <div className="text-center mb-3">
                            <div className="fw-bolder">送信が完了しました。</div>
                            入力いただいたメールアドレスに確認メールをお送りしましたのでご確認ください。
                        </div>
                    </div>
                    <div className="d-none" id="submitErrorMessage"><div className="text-center text-danger mb-3">痩身に失敗しました。</div></div>
                    <div className="d-grid"><button className="btn btn-primary btn-xl disabled" id="submitButton" type="submit">送信</button></div>
                </form>
            </div>
        </div>
    );
  }