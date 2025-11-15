import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BaseCrudService } from '@/integrations';
import { DanhmcKinthc } from '@/entities';
import { Image } from '@/components/ui/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Calculator, TrendingUp, Users, GraduationCap, BarChart3, RefreshCw, ArrowRight } from 'lucide-react';

export default function HomePage() {
  const [categories, setCategories] = useState<DanhmcKinthc[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesData = await BaseCrudService.getAll<DanhmcKinthc>('danhmckinthc');
        setCategories(categoriesData.items.filter(cat => cat.isActive).sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0)));
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-secondary-foreground">Đang tải nội dung...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section - Inspired by the split-screen layout */}
      <section className="w-full max-w-[120rem] mx-auto min-h-screen flex flex-col lg:flex-row">
        {/* Left side - Image */}
        <div className="lg:w-3/5 relative overflow-hidden">
          <Image
            src="https://static.wixstatic.com/media/516dbc_1e3c0820d1a74106b308cbc3b27a7e8c~mv2.png?originWidth=768&originHeight=576"
            alt="Biểu đồ kinh tế thị trường hiện đại"
            className="w-full h-full object-cover"
            width={800}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-primary/20"></div>
        </div>

        {/* Right side - Content block with dark background */}
        <div className="lg:w-2/5 bg-primary text-primary-foreground flex items-center">
          <div className="p-8 lg:p-12 xl:p-16">
            <div className="mb-6">
              <Badge variant="outline" className="border-primary-foreground text-primary-foreground mb-4">
                Kinh Tế Học
              </Badge>
            </div>
            
            <h1 className="font-heading text-4xl lg:text-5xl xl:text-6xl mb-6 leading-tight">
              Giá Trị Thặng Dư Trong Nền Kinh Tế Thị Trường
            </h1>
            
            <p className="font-paragraph text-lg lg:text-xl mb-8 opacity-90 leading-relaxed">
              Khám phá những khái niệm cốt lõi về giá trị thặng dư, cách thức hoạt động trong hệ thống kinh tế thị trường và tác động đến sự phát triển xã hội.
            </p>
            
            <p className="font-paragraph text-base lg:text-lg mb-10 opacity-80 leading-relaxed">
              Nội dung được tổ chức theo từng chủ đề cụ thể, giúp bạn hiểu sâu về cơ chế tạo ra và phân phối giá trị trong nền kinh tế hiện đại.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                <Link to="/kien-thuc">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Khám Phá Nội Dung
                </Link>
              </Button>
              <Button asChild size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                <Link to="/quiz">
                  <Calculator className="mr-2 h-5 w-5" />
                  Làm Bài Quiz
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Knowledge Overview Section */}
      <section className="w-full bg-secondary py-16 lg:py-24">
        <div className="max-w-[100rem] mx-auto px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <Badge variant="outline" className="border-primary text-primary mb-6 text-sm">
              Tổng Quan Kiến Thức
            </Badge>
            <h2 className="font-heading text-3xl lg:text-4xl text-secondary-foreground mb-6">
              Giá Trị Thặng Dư Trong Nền Kinh Tế Thị Trường
            </h2>
            <p className="font-paragraph text-lg text-secondary-foreground/80 max-w-4xl mx-auto leading-relaxed">
              Khám phá toàn diện về khái niệm giá trị thặng dư từ lý thuyết cơ bản đến ứng dụng thực tiễn. 
              Nội dung được cấu trúc có hệ thống giúp bạn hiểu rõ cơ chế hoạt động của nền kinh tế thị trường.
            </p>
          </div>

          {/* Key Topics Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {/* Foundation Topic */}
            <Card className="bg-background border-0 shadow-sm hover:shadow-lg transition-all duration-300 group">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors duration-300">
                    <RefreshCw className="h-6 w-6 text-primary" />
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    Nền Tảng Cơ Bản
                  </Badge>
                </div>
                <CardTitle className="font-heading text-xl text-secondary-foreground">
                  Tái Sản Xuất - Nền Tảng Hình Thành Giá Trị Thặng Dư
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="font-paragraph text-secondary-foreground/70 leading-relaxed mb-4">
                  Hiểu về cơ chế tái sản xuất giản đơn và mở rộng, nền tảng dẫn đến việc tích lũy tư bản và tạo ra giá trị thặng dư.
                </CardDescription>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-secondary-foreground/60">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    <span>Khái niệm tái sản xuất</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-secondary-foreground/60">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    <span>Hai hình thức tái sản xuất</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-secondary-foreground/60">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    <span>Ví dụ minh họa thực tế</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Dynamic Categories */}
            {categories.length > 0 && categories.slice(0, 1).map((category, index) => {
              const icons = [TrendingUp, GraduationCap, BarChart3, BookOpen];
              const IconComponent = icons[index % icons.length];
              
              return (
                <Card key={category._id} className="bg-background border-0 shadow-sm hover:shadow-lg transition-all duration-300 group">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors duration-300">
                        <IconComponent className="h-6 w-6 text-primary" />
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        Chủ đề {category.displayOrder || index + 1}
                      </Badge>
                    </div>
                    <CardTitle className="font-heading text-xl text-secondary-foreground">
                      {category.categoryName}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="font-paragraph text-secondary-foreground/70 leading-relaxed">
                      {category.categoryDescription}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Learning Objectives */}
          <div className="bg-background rounded-2xl p-8 lg:p-12 shadow-sm">
            <div className="text-center mb-8">
              <h3 className="font-heading text-2xl lg:text-3xl text-secondary-foreground mb-4">
                Mục Tiêu Học Tập
              </h3>
              <p className="font-paragraph text-secondary-foreground/80 max-w-2xl mx-auto">
                Sau khi hoàn thành khóa học, bạn sẽ nắm vững các kiến thức sau:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="p-4 bg-primary/10 rounded-2xl w-fit mx-auto mb-4">
                  <BookOpen className="h-8 w-8 text-primary" />
                </div>
                <h4 className="font-heading text-lg text-secondary-foreground mb-3">
                  Nắm Vững Lý Thuyết
                </h4>
                <p className="font-paragraph text-sm text-secondary-foreground/70 leading-relaxed">
                  Hiểu rõ khái niệm giá trị thặng dư, cơ chế hình thành và vai trò trong nền kinh tế thị trường
                </p>
              </div>

              <div className="text-center">
                <div className="p-4 bg-primary/10 rounded-2xl w-fit mx-auto mb-4">
                  <BarChart3 className="h-8 w-8 text-primary" />
                </div>
                <h4 className="font-heading text-lg text-secondary-foreground mb-3">
                  Phân Tích Thực Tiễn
                </h4>
                <p className="font-paragraph text-sm text-secondary-foreground/70 leading-relaxed">
                  Áp dụng kiến thức để phân tích các hiện tượng kinh tế trong thực tế cuộc sống
                </p>
              </div>

              <div className="text-center">
                <div className="p-4 bg-primary/10 rounded-2xl w-fit mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-primary" />
                </div>
                <h4 className="font-heading text-lg text-secondary-foreground mb-3">
                  Tư Duy Phát Triển
                </h4>
                <p className="font-paragraph text-sm text-secondary-foreground/70 leading-relaxed">
                  Phát triển tư duy phản biện về các vấn đề kinh tế và xã hội hiện đại
                </p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12">
            <Link to="/kien-thuc">
              <Button size="lg" className="font-paragraph text-base px-8 py-3 rounded-xl">
                Khám Phá Kiến Thức Chi Tiết
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <p className="font-paragraph text-sm text-secondary-foreground/60 mt-4">
              Nội dung được cập nhật thường xuyên với những kiến thức mới nhất
            </p>
          </div>
        </div>
      </section>

      {/* Knowledge Features Section */}
      <section className="w-full py-16 lg:py-24">
        <div className="max-w-[100rem] mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl lg:text-4xl text-secondary-foreground mb-6">
              Tính Năng Học Tập
            </h2>
            <p className="font-paragraph text-lg text-secondary-foreground/80 max-w-3xl mx-auto leading-relaxed">
              Khám phá các công cụ và phương pháp học tập được thiết kế để tối ưu hóa quá trình tiếp thu kiến thức.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Interactive Content */}
            <Card className="bg-background border-0 shadow-sm hover:shadow-lg transition-all duration-300 group">
              <CardHeader className="text-center pb-4">
                <div className="p-4 bg-primary/10 rounded-2xl w-fit mx-auto mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                  <BookOpen className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="font-heading text-xl text-secondary-foreground">
                  Nội Dung Tương Tác
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="font-paragraph text-secondary-foreground/70 leading-relaxed">
                  Học tập thông qua các ví dụ thực tế và bài tập tương tác, giúp hiểu sâu về các khái niệm kinh tế.
                </CardDescription>
              </CardContent>
            </Card>

            {/* Structured Learning */}
            <Card className="bg-background border-0 shadow-sm hover:shadow-lg transition-all duration-300 group">
              <CardHeader className="text-center pb-4">
                <div className="p-4 bg-primary/10 rounded-2xl w-fit mx-auto mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                  <GraduationCap className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="font-heading text-xl text-secondary-foreground">
                  Học Có Hệ Thống
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="font-paragraph text-secondary-foreground/70 leading-relaxed">
                  Kiến thức được sắp xếp theo trình tự logic, từ cơ bản đến nâng cao, phù hợp với mọi trình độ.
                </CardDescription>
              </CardContent>
            </Card>

            {/* Assessment Tools */}
            <Card className="bg-background border-0 shadow-sm hover:shadow-lg transition-all duration-300 group">
              <CardHeader className="text-center pb-4">
                <div className="p-4 bg-primary/10 rounded-2xl w-fit mx-auto mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                  <BarChart3 className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="font-heading text-xl text-secondary-foreground">
                  Đánh Giá Kiến Thức
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="font-paragraph text-secondary-foreground/70 leading-relaxed">
                  Kiểm tra và đánh giá mức độ hiểu biết thông qua các bài quiz và bài tập thực hành.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full bg-primary py-16 lg:py-20">
        <div className="max-w-[100rem] mx-auto px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl lg:text-4xl text-primary-foreground mb-6">
            Kiểm Tra Kiến Thức Của Bạn
          </h2>
          <p className="font-paragraph text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto leading-relaxed">
            Hoàn thành bài quiz để đánh giá mức độ hiểu biết của bạn về giá trị thặng dư trong nền kinh tế thị trường.
          </p>
          <Button asChild size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
            <Link to="/quiz">
              <Calculator className="mr-2 h-5 w-5" />
              Bắt Đầu Quiz Ngay
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}