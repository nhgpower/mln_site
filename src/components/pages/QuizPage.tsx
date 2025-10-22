import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ExternalLink } from 'lucide-react';

export default function QuizPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground py-6">
        <div className="max-w-[100rem] mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-heading text-2xl lg:text-3xl mb-2">
                Quiz Kiến Thức
              </h1>
              <p className="font-paragraph text-primary-foreground/90">
                Giá trị thặng dư trong nền kinh tế thị trường
              </p>
            </div>
            <Button asChild variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              <Link to="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Về Trang Chủ
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Quiz Content */}
      <main className="flex-1">
        <div className="max-w-[100rem] mx-auto px-6 lg:px-8 py-8">
          {/* Instructions */}
          <div className="bg-secondary p-6 rounded-lg mb-8">
            <h2 className="font-heading text-xl text-secondary-foreground mb-4">
              Hướng Dẫn Làm Bài
            </h2>
            <ul className="font-paragraph text-secondary-foreground/80 space-y-2">
              <li>• Đọc kỹ từng câu hỏi trước khi trả lời</li>
              <li>• Chọn đáp án phù hợp nhất với kiến thức đã học</li>
              <li>• Bài quiz sẽ đánh giá hiểu biết của bạn về các khái niệm cơ bản</li>
              <li>• Hoàn thành tất cả câu hỏi để nhận kết quả chi tiết</li>
            </ul>
          </div>

          {/* Quiz Iframe Container */}
          <div className="bg-background rounded-lg shadow-sm border overflow-hidden">
            <div className="bg-primary text-primary-foreground p-4 flex items-center justify-between">
              <h3 className="font-heading text-lg">
                Bài Quiz Trực Tuyến
              </h3>
              <a 
                href="https://form.typeform.com/to/wTouQpBm" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm hover:underline"
              >
                Mở trong tab mới
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
            
            <div className="relative w-full" style={{ paddingBottom: '75%' }}>
              <iframe
                src="https://form.typeform.com/to/wTouQpBm"
                className="absolute top-0 left-0 w-full h-full border-0"
                title="Quiz Giá trị thặng dư trong nền kinh tế thị trường"
                allow="camera; microphone; autoplay; encrypted-media; fullscreen"
                loading="lazy"
              />
            </div>
          </div>

          {/* Additional Information */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-background p-6 rounded-lg border">
              <h3 className="font-heading text-lg text-secondary-foreground mb-3">
                Sau Khi Hoàn Thành
              </h3>
              <p className="font-paragraph text-secondary-foreground/80 leading-relaxed">
                Bạn sẽ nhận được kết quả chi tiết về mức độ hiểu biết của mình. 
                Sử dụng kết quả này để xác định những lĩnh vực cần học thêm.
              </p>
            </div>

            <div className="bg-background p-6 rounded-lg border">
              <h3 className="font-heading text-lg text-secondary-foreground mb-3">
                Cần Hỗ Trợ?
              </h3>
              <p className="font-paragraph text-secondary-foreground/80 leading-relaxed mb-4">
                Nếu gặp khó khăn với bài quiz, hãy quay lại trang chủ để ôn tập 
                các khái niệm cơ bản trước khi làm bài.
              </p>
              <Button asChild variant="outline" size="sm">
                <Link to="/">
                  Ôn Tập Kiến Thức
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}