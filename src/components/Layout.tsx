import { Outlet, Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BookOpen, Calculator, Home } from 'lucide-react';

export default function Layout() {
  const location = useLocation();

  return (
    <div className="min-h-screen">
      {/* Navigation Header */}
      <nav className="bg-background border-b border-secondary sticky top-0 z-50">
        <div className="max-w-[100rem] mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo/Brand */}
            <Link to="/" className="flex items-center gap-3">
              <div className="p-2 bg-primary rounded-lg">
                <BookOpen className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-heading text-lg text-secondary-foreground">
                  Kinh Tế Học
                </h1>
                <p className="font-paragraph text-xs text-secondary-foreground/60">
                  Giá trị thặng dư
                </p>
              </div>
            </Link>

            {/* Navigation Links */}
            <div className="flex items-center gap-4">
              <Button 
                asChild 
                variant={location.pathname === '/' ? 'default' : 'ghost'}
                size="sm"
              >
                <Link to="/">
                  <Home className="mr-2 h-4 w-4" />
                  Trang Chủ
                </Link>
              </Button>
              
              <Button 
                asChild 
                variant={location.pathname === '/quiz' ? 'default' : 'ghost'}
                size="sm"
              >
                <Link to="/quiz">
                  <Calculator className="mr-2 h-4 w-4" />
                  Quiz
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12">
        <div className="max-w-[100rem] mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* About */}
            <div>
              <h3 className="font-heading text-lg mb-4">
                Về Trang Web
              </h3>
              <p className="font-paragraph text-primary-foreground/80 leading-relaxed">
                Nền tảng học tập về giá trị thặng dư trong nền kinh tế thị trường, 
                cung cấp kiến thức cơ bản và bài quiz đánh giá.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-heading text-lg mb-4">
                Liên Kết Nhanh
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link 
                    to="/" 
                    className="font-paragraph text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  >
                    Trang Chủ
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/quiz" 
                    className="font-paragraph text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  >
                    Làm Bài Quiz
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="font-heading text-lg mb-4">
                Thông Tin
              </h3>
              <p className="font-paragraph text-primary-foreground/80 leading-relaxed">
                Nội dung được tổ chức theo chủ đề, giúp người học tiếp cận 
                kiến thức một cách có hệ thống.
              </p>
            </div>
          </div>

          <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
            <p className="font-paragraph text-primary-foreground/60 text-sm">
              © 2024 Kinh Tế Học - Giá Trị Thặng Dư. Tất cả quyền được bảo lưu.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}