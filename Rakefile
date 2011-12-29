require "bundler/setup"
require "erb"
require "uglifier"
require "sproutcore"

LICENSE = File.read("generators/license.js")

module SproutCore
  module Compiler
    class Entry
      def body
        "\n(function(exports) {\n#{@raw_body}\n})({});\n"
      end
    end
  end
end

def strip_require(file)
  result = File.read(file)
  result.gsub!(%r{^\s*require\(['"]([^'"])*['"]\);?\s*$}, "")
  result
end

def strip_sc_assert(file)
  result = File.read(file)
  result.gsub!(%r{^(\s)+sc_assert\((.*)\).*$}, "")
  result
end

def uglify(file)
  uglified = Uglifier.compile(File.read(file))
  "#{LICENSE}\n#{uglified}"
end

SproutCore::Compiler.intermediate = "tmp/intermediate"
SproutCore::Compiler.output = "tmp/static"

def compile_statechart_task
  js_tasks = SproutCore::Compiler::Preprocessors::JavaScriptTask.with_input "ember-statechart/lib/**/*.js", ".."
  SproutCore::Compiler::CombineTask.with_tasks js_tasks, "#{SproutCore::Compiler.intermediate}/ember-statechart"
end

task :compile_statechart_task => compile_statechart_task

task :build => [:compile_statechart_task]

file "dist/ember-statechart.js" => :build do
  puts "Generating ember-statechart.js"
  
  mkdir_p "dist"
  
  File.open("dist/ember-statechart.js", "w") do |file|
    file.puts strip_require("tmp/static/ember-statechart.js")
  end
end

# Minify dist/ember-statechart.js to dist/ember-statechart.min.js
file "dist/ember-statechart.min.js" => "dist/ember-statechart.js" do
  puts "Generating ember-statechart.min.js"
  
  File.open("dist/ember-statechart.prod.js", "w") do |file|
    file.puts strip_sc_assert("dist/ember-statechart.js")
  end
  
  File.open("dist/ember-statechart.min.js", "w") do |file|
    file.puts uglify("dist/ember-statechart.prod.js")
  end
  rm "dist/ember-statechart.prod.js"
end

desc "Build SproutCore Statecharts"
task :dist => ["dist/ember-statechart.min.js"]

desc "Clean artifacts from previous builds"
task :clean do
  sh "rm -rf tmp && rm -rf dist"
end

task :default => :dist