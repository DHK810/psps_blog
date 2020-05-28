# frozen_string_literal: true

Gem::Specification.new do |spec|
  spec.name          = "jekyll-theme-clean-blog-kr"
  spec.version       = "1.0.0"
  spec.authors       = ["Ogaeng"]
  spec.email         = ["ogaeng@ogaeng.com"]

  spec.summary       = "부트스트랩 4 기반의 심플 블로그 테마"
  spec.homepage      = "https://github.com/ogaeng/jekyll-theme-clean-blog-kr"
  spec.license       = "MIT"

  spec.files         = `git ls-files -z`.split("\x0").select { |f| f.match(%r{^(assets|_layouts|_includes|_sass|LICENSE|README)}i) }

  spec.add_runtime_dependency "jekyll", "~> 3.8.5"

  spec.add_development_dependency "bundler", "~> 2.0.1"
  spec.add_development_dependency "rake", "~> 12.0"
end
